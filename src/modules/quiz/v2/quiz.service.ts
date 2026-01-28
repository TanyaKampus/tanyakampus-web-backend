import { StatusQuiz, TipePertanyaan } from "@prisma/client";
import quizRepository from "./quiz.repository";

// ==================== QUIZ ====================
const getActiveQuiz = async () => {
  const quiz = await quizRepository.findActiveQuiz();
  if (!quiz) throw new Error("No active quiz found");
  return quiz;
};

const getQuizById = async (quiz_id: string) => {
  if (!quiz_id) throw new Error("Quiz ID is required");
  const quiz = await quizRepository.findQuizById(quiz_id);
  if (!quiz) throw new Error("Quiz not found");
  return quiz;
};

const startQuiz = async (user_id: string, quiz_id: string) => {
  if (!user_id) throw new Error("User ID is required to start quiz");
  if (!quiz_id) throw new Error("Quiz ID is required to start quiz");

  await getQuizById(quiz_id);
  const quiz = await quizRepository.startQuiz(user_id, quiz_id);
  
  if (!quiz) throw new Error("Failed to start quiz");
  return quiz;
};

// ==================== HISTORY ====================
const getHistoryById = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required");
  const history = await quizRepository.findHistoryById(riwayat_id);
  if (!history) throw new Error("Quiz history not found");
  return history;
};

const getHistoryId = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required");
  const history = await quizRepository.findHistoryId(riwayat_id);
  if (!history) throw new Error("Quiz history not found");
  return history;
};

const getUserHistory = async (user_id: string, limit: number = 10) => {
  const history = await quizRepository.findUserHistory(user_id, limit);
  if (!history || history.length === 0) {
    console.log(`No quiz history found for user: ${user_id}`);
    return [];
  }
  return history;
};

// ==================== QUESTIONS ====================
const getAllQuestions = async (quiz_id: string) => {
  if (!quiz_id) throw new Error("Quiz ID is required to fetch questions");
  const questions = await quizRepository.findAllQuestion(quiz_id);
  if (!questions || questions.length === 0) {
    throw new Error("No questions found for this quiz");
  }
  return questions;
};

const getQuestionsByType = async (quizId: string, tipe: TipePertanyaan) => {
  if (!quizId) throw new Error("Quiz ID is required");
  return await quizRepository.findQuestionByType(quizId, tipe);
};

const getQuestionById = async (question_id: string) => {
  if (!question_id) throw new Error("Question ID is required");
  const question = await quizRepository.findQuestionById(question_id);
  if (!question) throw new Error("Question not found");
  return question;
};

// ==================== ANSWERS ====================
const submitAnswer = async (
  riwayat_id: string,
  pertanyaan_id: string,
  jawaban_id: string
) => {
  const history = await getHistoryById(riwayat_id);

  if (history.status_quiz !== "IN_PROGRESS") {
    throw new Error("Cannot submit answer to a completed quiz");
  }

  await getQuestionById(pertanyaan_id);

  const answer = await quizRepository.submitAnswer(
    riwayat_id,
    pertanyaan_id,
    jawaban_id
  );

  if (!answer) throw new Error("Failed to submit answer");
  return answer;
};

const countAnswersByHistory = async (
  riwayat_id: string,
  tipe?: TipePertanyaan
) => {
  if (!riwayat_id) throw new Error("History ID is required to count answers");
  return await quizRepository.countJawabanByRiwayat(riwayat_id, tipe);
};

// ==================== SCORING ====================
type BidangGabungan =
  | "TEKNIK_DAN_KOMPUTER"
  | "BISNIS_DAN_EKONOMI"
  | "SOSIAL_DAN_POLITIK"
  | "DESAIN_DAN_SENI";

type SkorBidang = {
  bidang_id: string;
  nama_bidang: string;
  skor_main: number;
  skor_tiebreaker: number;
  skor_total: number;
};

//  FIX 1: Dynamic bidang loading
const calculateAndSaveFieldResults = async (riwayat_id: string) => {
  if (!riwayat_id)
    throw new Error("History ID is required to calculate field results");

  const history = await getHistoryId(riwayat_id);

  const allBidang = await quizRepository.findAllBidang();

  const scores: SkorBidang[] = allBidang.map((bidang) => ({
    bidang_id: bidang.bidang_id,
    nama_bidang: bidang.nama_bidang,
    skor_main: 0,
    skor_tiebreaker: 0,
    skor_total: 0,
  }));

  // Calculate main scores
  const mainAnswers = history.jawabanUsers.filter(
    (ju) => ju.pertanyaan.tipe === TipePertanyaan.BIDANG
  );

  const scoresWithMain = scores.map((score) => {
    const relevantAnswers = mainAnswers.filter(
      (ja) => ja.pertanyaan.bidang_id === score.bidang_id
    );

    const totalSkor = relevantAnswers.reduce(
      (sum, ja) => sum + (ja.jawaban.nilai || 0),
      0
    );

    return {
      ...score,
      skor_main: totalSkor,
    };
  });

  //  CEK TIE AWAL (sebelum tiebreaker)
  const maxSkor = Math.max(...scoresWithMain.map((s) => s.skor_main));
  const winners = scoresWithMain.filter((s) => s.skor_main === maxSkor);
  const initialTie = winners.length > 1;

  // Apply tiebreaker if needed
  let finalScores = scoresWithMain;
  if (initialTie && history.used_tiebreaker) {
    const tiebreakerAnswers = history.jawabanUsers.filter(
      (ju) => ju.pertanyaan.tipe === TipePertanyaan.TIE_BREAKER
    );

   const tiebreakerMapping = {
     EKSTROVERT_INTROVERT: {
       yes: ["Bisnis dan Ekonomi", "Ilmu Sosial dan Politik"], 
       no: ["Teknik dan Ilmu Komputer", "Desain dan Seni"], 
     },
     LOGIS_INTUISI: {
       yes: ["Teknik dan Ilmu Komputer", "Bisnis dan Ekonomi"], 
       no: ["Ilmu Sosial dan Politik", "Desain dan Seni"], 
     },
     TERSTRUKTUR_BEBAS: {
       yes: ["Teknik dan Ilmu Komputer"],
       no: ["Ilmu Sosial dan Politik", "Bisnis dan Ekonomi", "Desain dan Seni"], 
     },
   };

    finalScores = tiebreakerAnswers.reduce((acc, ja) => {
      const kategori = ja.pertanyaan.tiebreaker_type;
      const isYes = ja.jawaban.tipe_jawaban === "YA";
      const mapping =
        tiebreakerMapping[kategori as keyof typeof tiebreakerMapping];

      if (!mapping) return acc;

      const targetBidang = isYes ? mapping.yes : mapping.no;

      return acc.map((score) => ({
        ...score,
        skor_tiebreaker: targetBidang.includes(score.nama_bidang)
          ? score.skor_tiebreaker + 1
          : score.skor_tiebreaker,
      }));
    }, scoresWithMain);
  }

  // hitung total skorrboskuu
  const scoresWithTotal = finalScores.map((score) => ({
    ...score,
    skor_total: score.skor_main + score.skor_tiebreaker,
  }));

  //  CEK TIE AKHIR (setelah tiebreaker)
  const maxTotal = Math.max(...scoresWithTotal.map((s) => s.skor_total));
  const finalWinners = scoresWithTotal.filter((s) => s.skor_total === maxTotal);
  const finalTie = finalWinners.length > 1;

  // Calculate percentage
  const hasil = scoresWithTotal.map((score) => ({
    ...score,
    persentase:
      maxTotal > 0
        ? Math.round((score.skor_total / maxTotal) * 10000) / 100
        : 0,
    is_winner: score.skor_total === maxTotal,
  }));

  // Save results
  const saved = await Promise.all(
    hasil.map((skor: any) =>
      quizRepository.saveHasilBidang({
        riwayat_id: riwayat_id,
        bidang_id: skor.bidang_id,
        skor_bidang: skor.skor_main,
        skor_tiebreaker: skor.skor_tiebreaker,
        skor_total: skor.skor_total,
        persentase: skor.persentase,
        is_winner: skor.is_winner,
      })
    )
  );

  // 👇 FIX: Return berdasarkan final tie, bukan initial tie
  return {
    hasTie: finalTie, // ✅ Gunakan finalTie
    needsTiebreaker: finalTie && !history.used_tiebreaker, // ✅ Cek final tie
    data: saved,
  };
};

//  NEW: Get field results
const getFieldResults = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to get field results");
  return await quizRepository.getHasilBidang(riwayat_id);
};

// ==================== TIEBREAKER ====================
//  NEW: Set tiebreaker used
const setUsedTiebreaker = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to set tiebreaker");
  return await quizRepository.setUsedTieBreaker(riwayat_id);
};

// ==================== COMPLETE QUIZ ====================
const completeQuiz = async (riwayat_id: string, bidangTerpilih?: string) => {
  if (!riwayat_id) throw new Error("History ID is required to complete quiz");
 let finalBidang = bidangTerpilih;

 if (!finalBidang) {
   // Get hasil bidang
   const hasilBidang = await quizRepository.getHasilBidang(riwayat_id);

   // Find winner
   const winner = hasilBidang.find((h) => h.is_winner);

   if (winner) {
     finalBidang = winner.bidang_id; // 👈 Auto-set winner
   }
 }

 return await quizRepository.updateRiwayatStatus(
   riwayat_id,
   StatusQuiz.COMPLETED,
   finalBidang
 );
};

const abandonQuiz = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to abandon quiz");
  return await quizRepository.updateRiwayatStatus(
    riwayat_id,
    StatusQuiz.ABANDONED
  );
};

// ==================== RECOMMENDATIONS ====================
// 👇 NEW: Calculate major results
const calculateAndSaveMajorResults = async (riwayat_id: string, bidang_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to calculate major results");
  if (!bidang_id) throw new Error("Field ID is required to calculate major results");
  
  const jurusanList = await quizRepository.findJurusanByBidang(bidang_id);
  
  const ranked = jurusanList.map((item, index) => ({
    riwayat_id: riwayat_id,
    jurusan_id: item.jurusan_id,
  }));
  
  return await Promise.all(ranked.map(data => quizRepository.saveHasilJurusan(data)));
};

// 👇 NEW: Calculate campus results
const calculateAndSaveCampusResults = async (riwayat_id: string, jurusan_ids: string[]) => {
  if (!riwayat_id) throw new Error("History ID is required to calculate campus results");
  if (!jurusan_ids || jurusan_ids.length === 0) throw new Error("Major IDs cannot be empty");
  
  const kampusList = await quizRepository.findCampusByJurusan(jurusan_ids);
  
  const ranked = kampusList.map((item, index) => ({
    riwayat_id: riwayat_id,
    kampus_id: item.kampus_id,
  }));
  
  return await Promise.all(ranked.map(data => quizRepository.saveHasilKampus(data)));
};

// ==================== FIELDS ====================
//  NEW: Get all fields
const getAllFields = async () => {
  return await quizRepository.findAllBidang();
};

//  NEW: Get field by ID
const getFieldById = async (bidang_id: string) => {
  if (!bidang_id) throw new Error("Field ID is required");
  const bidang = await quizRepository.findBidangById(bidang_id);
  if (!bidang) throw new Error("Field not found");
  return bidang;
};

//  NEW: Get majors by field
const getMajorsByField = async (bidang_id: string) => {
  if (!bidang_id) throw new Error("Field ID is required to get majors");
  return await quizRepository.findJurusanByBidang(bidang_id);
};

const submitAnswersBatch = async (
  user_id: string,
  riwayat_id: string,
  answers: Array<{ pertanyaan_id: string; jawaban_id: string }>
) => {
  // Validate history
  const history = await getHistoryById(riwayat_id);
  
  if (history.user_id !== user_id) {
    throw new Error("You are not authorized to submit answers for this quiz");
  }

  if (history.status_quiz !== "IN_PROGRESS") {
    throw new Error("Cannot submit answers to a completed quiz");
  }

  // Validate all questions belong to this quiz
  const questions = await getAllQuestions(history.quiz_id);
  const validQuestionIds = questions.map(q => q.pertanyaan_id);
  
  const invalidAnswers = answers.filter(
    a => !validQuestionIds.includes(a.pertanyaan_id)
  );
  
  if (invalidAnswers.length > 0) {
    throw new Error("Some questions do not belong to this quiz");
  }

  // Submit batch
  const result = await quizRepository.submitAnswersBatch(riwayat_id, answers);
  
  return {
    success: true,
    submitted: result.length,
    data: result
  };
};

export default {
  submitAnswersBatch,
  // Quiz
  getActiveQuiz,
  getQuizById,
  startQuiz,
  
  // History
  getUserHistory,
  getHistoryById,
  
  // Questions
  getAllQuestions,
  getQuestionsByType,
  getQuestionById,
  
  // Answers
  submitAnswer,
  countAnswersByHistory,
  
  // Scoring
  calculateAndSaveFieldResults,
  getFieldResults,             //  NEW
  
  // Tiebreaker
  setUsedTiebreaker,           //  NEW
  
  // Complete
  completeQuiz,
  abandonQuiz,
  
  // Recommendations
  calculateAndSaveMajorResults,    //  NEW
  calculateAndSaveCampusResults,   // NEW
  
  // Fields
  getAllFields,                //  NEW
  getFieldById,                //  NEW
  getMajorsByField,            //  NEW
};
console.log("test")