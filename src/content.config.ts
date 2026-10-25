import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 기존 기출문제 컬렉션
const examsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exams' }),
  schema: z.object({
    subject: z.enum(['전자공학개론', '무선공학개론', '통신이론']),
    examType: z.enum(['국가직', '지방직', '국회직', '군무원']),
    year: z.number().min(2007).max(2026),
    questionNumber: z.number().min(1).max(20),
    title: z.string(),
    answer: z.number().min(1).max(5),
    options: z.array(z.string()).min(2),
    explanation: z.string().optional(),
    chapter: z.string().optional(),
  }),
});

// 2. 개념 정리 컬렉션 정의
const conceptsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/concepts' }),
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    category: z.string().optional(),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
  }),
});

// 3. [추가] AI 가이드 컬렉션 정의
const aiGuideCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ai-guide' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    summary: z.string().optional(),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()).optional(), // ← 이 줄을 꼭 추가해 주세요!
  }),
});

// 4. collections 객체에 ai-guide 추가 등록
export const collections = {
  exams: examsCollection,
  concepts: conceptsCollection,
  'ai-guide': aiGuideCollection,
};