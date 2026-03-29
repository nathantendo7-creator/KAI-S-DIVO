import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Default for dev, set in .env

  if (password === adminPassword) {
    // In a real app, use JWT. For now, a simple token.
    return res.status(200).json({ token: 'admin-token-' + Date.now() });
  }

  return res.status(401).json({ error: 'Unauthorized' });
};
