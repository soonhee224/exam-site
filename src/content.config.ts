import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const examsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exams' }),
  schema: z.object({
    subject: z.enum(['전자공학개론', '무선공학개론', '통신이론']),
    examType: z.enum(['국가직', '지방직', '국회직', '군무원']),
    year: z.number().min(2007).max(2026),
    questionNumber: z.number().min(1).max(20),
    title: z.string(),
    // 정답 번호 범위를 5번까지 허용
    answer: z.number().min(1).max(5),
    // 4지선다와 5지선다를 모두 허용하도록 최소 2개 이상으로 변경
    options: z.array(z.string()).min(2),
    explanation: z.string().optional(), // 상세 해설
    chapter: z.string().optional(),
  }),
});

export const collections = {
  exams: examsCollection,
};