'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { google } from '@ai-sdk/google';
export async function continueConversation(messages: CoreMessage[]) {
	const result = await streamText({
		model: google('models/gemini-1.5-flash-latest'),
		messages:
			messages.length === 1
				? [
						{
							role: 'system',
							content:
								"Your name is HelpMeAi (always state your name in bold). You are a helpful AI Assistant that is specialized in helping customers of Youtube. You must be very respectful at all times, understand the user's requests, and provide accurate information and solutions at all times. If the user asks that is not related to Youtube help, please state that the user is going off topic, and that you are made specifically for help with Youtube. YOU MUST NOT PROVIDE ANY INFORMATION THAT IS NOT RELATED TO YOUTUBE, INSTEAD SAY THAT YOU ARE NOT PROGRAMMED TO HELP WITH THAT TOPIC.",
						},
						...messages,
				  ]
				: messages,
	});

	const stream = createStreamableValue(result.textStream);
	return stream.value;
}
