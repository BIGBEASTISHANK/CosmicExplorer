// Summarizes daily space weather events and their potential impact on Earth using NASA's Space Weather Database.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpaceWeatherSummaryInputSchema = z.object({
  date: z.string().describe('The date for which to summarize space weather. Format: YYYY-MM-DD'),
});
export type SpaceWeatherSummaryInput = z.infer<typeof SpaceWeatherSummaryInputSchema>;

const SpaceWeatherSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of space weather events and their potential impact on Earth.'),
});
export type SpaceWeatherSummaryOutput = z.infer<typeof SpaceWeatherSummaryOutputSchema>;

export async function summarizeSpaceWeather(input: SpaceWeatherSummaryInput): Promise<SpaceWeatherSummaryOutput> {
  return summarizeSpaceWeatherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spaceWeatherSummaryPrompt',
  input: {schema: SpaceWeatherSummaryInputSchema},
  output: {schema: SpaceWeatherSummaryOutputSchema},
  prompt: `You are an AI assistant summarizing space weather events for a daily briefing.
  Provide a concise summary of space weather events and their potential impact on Earth for the date: {{date}}.
  Use data from NASA's Space Weather Database to generate the summary.
  Focus on potential disruptions to communication, navigation, and satellite operations.
  Keep the summary to under 200 words.
  Respond in a professional, easy-to-understand tone.
  Do not make up information, instead explain if there is no information available.
  `,
});

const summarizeSpaceWeatherFlow = ai.defineFlow(
  {
    name: 'summarizeSpaceWeatherFlow',
    inputSchema: SpaceWeatherSummaryInputSchema,
    outputSchema: SpaceWeatherSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
