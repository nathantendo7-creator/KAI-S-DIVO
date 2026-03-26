import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.string(),
  message: z.string().min(1),
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input', details: result.error.errors });
  }

  // TODO: Integrate your preferred email provider (e.g., Resend, SendGrid)
  console.log('Received contact request:', result.data);

  return res.status(200).json({ success: true });
};
