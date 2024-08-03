'use server';

import db from '@/lib/db';

type SubjectScore = {
  ids: string[];
  totalScore: number;
  count: number;
  teacher: string;
  studentId: string;
  subject: string;
};

export const getSubjectScoresRecordsByStudentId = async (
  studentId: string,
  achievements: string[],
) => {
  const scoreRecords = await db.scoreRecord.findMany({
    where: {
      studentId,
      id: {
        in: achievements,
      },
    },

    select: {
      id: true,
      score: true,
      teacher: { select: { name: true } },
      achievement: {
        select: {
          achievementTemplate: { select: { name: true } },
          subject: { select: { name: true } },
        },
      },
    },
  });

  const data = scoreRecords.map((record) => {
    return {
      id: record.id,
      score: record.score,
      teacher: record.teacher.name,
      subject: record.achievement.subject.name,
      achievement: record.achievement.achievementTemplate.name,
    };
  });

  return data;
};

const getScoresByStdentId = async (studentId: string, periodId: string) => {
  const scoreRecords = await db.scoreRecord.findMany({
    where: {
      achievement: {
        periodId,
      },
      studentId,
    },
    select: {
      id: true,
      score: true,
      teacher: { select: { name: true } },
      studentId: true,
      achievement: {
        select: {
          achievementTemplate: { select: { name: true } },
          subject: { select: { name: true } },
        },
      },
    },
  });

  return scoreRecords;
};

export const getPartialScoresByStudentId = async (
  studentId: string,
  periodId: string,
) => {
  const subjectScores: { [key: string]: SubjectScore } = {};

  const scoreRecords = await getScoresByStdentId(studentId, periodId);

  scoreRecords.forEach((record) => {
    const subjectName = record.achievement.subject.name;

    if (!subjectScores[subjectName]) {
      subjectScores[subjectName] = {
        ids: [],
        totalScore: 0,
        count: 0,
        teacher: record.teacher.name,
        studentId: record.studentId,
        subject: subjectName,
      };
    }

    subjectScores[subjectName].ids.push(record.id);
    subjectScores[subjectName].totalScore += record.score;
    subjectScores[subjectName].count += 1;
  });

  const data = Object.keys(subjectScores).map((subject) => {
    const subjectData = subjectScores[subject];
    return {
      id: subjectData.ids,
      subject: subjectData.subject,
      teacher: subjectData.teacher,
      studentId: subjectData.studentId,
      partialScore: subjectData.totalScore / subjectData.count,
    };
  });

  return data;
};
