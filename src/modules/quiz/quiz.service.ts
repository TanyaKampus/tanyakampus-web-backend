import { StatusQuiz, TipePertanyaan } from "@prisma/client";
import quizRepository from "./quiz.repository";

const createQuiz = async (data: {
  nama_quiz: string;
  deskripsi_quiz?: string;
  is_active: boolean;
}) => {
  return await quizRepository.createQuiz(data);
};

const getAllQuiz = async () => {
  const quiz = await quizRepository.getAllQuiz();

  if (!quiz) throw new Error("Quiz not found");

  return quiz;
};


const updateQuiz = async (
  quiz_id: string,
  data: {
    nama_quiz?: string;
    deskripsi_quiz?: string;
    is_active?: boolean;
  }
) => {
  const quiz = await quizRepository.updateQuiz(quiz_id, data);

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  return quiz
};

const deleteQuiz = async (quiz_id: string) => {
  const quiz = await quizRepository.deleteQuiz(quiz_id);

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  return quiz;
};

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

const getQuestionsByType = async (quiz_id: string, tipe: TipePertanyaan) => {
  if (!quiz_id) throw new Error("Quiz ID is required");
  return await quizRepository.findQuestionByType(quiz_id, tipe);
};

const getQuestionById = async (question_id: string) => {
  if (!question_id) throw new Error("Question ID is required");
  const question = await quizRepository.findQuestionById(question_id);
  if (!question) throw new Error("Question not found");
  return question;
};

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
  return await quizRepository.countAnswersByHistory(riwayat_id, tipe);
};

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

const calculateAndSaveFieldResults = async (riwayat_id: string) => {
  if (!riwayat_id)
    throw new Error("History ID is required to calculate field results");

  const history = await getHistoryId(riwayat_id);

  const allBidang = await quizRepository.findAllFields();

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
      quizRepository.saveFieldResults({
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

  return {
    hasTie: finalTie, 
    needsTiebreaker: finalTie && !history.used_tiebreaker, 
    data: saved,
  };
};

const getFieldResults = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to get field results");
  return await quizRepository.getFieldResults(riwayat_id);
};

const setUsedTiebreaker = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to set tiebreaker");
  return await quizRepository.setUsedTieBreaker(riwayat_id);
};

const completeQuiz = async (riwayat_id: string, bidangTerpilih?: string) => {
  if (!riwayat_id) throw new Error("History ID is required to complete quiz");
 let finalBidang = bidangTerpilih;

 if (!finalBidang) {
   // Get hasil bidang
   const hasilBidang = await quizRepository.getFieldResults(riwayat_id);

   // Find winner
   const winner = hasilBidang.find((h) => h.is_winner);

   if (winner) {
     finalBidang = winner.bidang_id; // 👈 Auto-set winner
   }
 }

 return await quizRepository.updateHistoryStatus(
   riwayat_id,
   StatusQuiz.COMPLETED,
   finalBidang
 );
};

const abandonQuiz = async (riwayat_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to abandon quiz");
  return await quizRepository.updateHistoryStatus(
    riwayat_id,
    StatusQuiz.ABANDONED
  );
};

const calculateAndSaveMajorResults = async (riwayat_id: string, bidang_id: string) => {
  if (!riwayat_id) throw new Error("History ID is required to calculate major results");
  if (!bidang_id) throw new Error("Field ID is required to calculate major results");
  
  const jurusanList = await quizRepository.findMajorsByField(bidang_id);
  
  const ranked = jurusanList.map((item, index) => ({
    riwayat_id: riwayat_id,
    jurusan_id: item.jurusan_id,

  }));
  
  return await Promise.all(ranked.map(data => quizRepository.saveMajorResults(data)));
};

const calculateAndSaveCampusResults = async (riwayat_id: string, jurusan_ids: string[]) => {
  if (!riwayat_id) throw new Error("History ID is required to calculate campus results");
  if (!jurusan_ids || jurusan_ids.length === 0) throw new Error("Major IDs cannot be empty");
  
  const kampusList = await quizRepository.findCampusByMajors(jurusan_ids);
  
  const ranked = kampusList.map((item, index) => ({
    riwayat_id: riwayat_id,
    kampus_id: item.kampus_id,
    skor_match: 100 - (index * 5),
    rank: index + 1
  }));
  
  return await Promise.all(ranked.map(data => quizRepository.saveCampusResults(data)));
};


export default {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getActiveQuiz,
  startQuiz,
  getQuestionsByType,
  getQuestionById,
  getHistoryById,
  submitAnswer,
  countAnswersByHistory,
  calculateAndSaveFieldResults,
  getFieldResults,
  setUsedTiebreaker,
  completeQuiz,
  abandonQuiz,
  calculateAndSaveMajorResults,
  calculateAndSaveCampusResults,
}

console.log("test");