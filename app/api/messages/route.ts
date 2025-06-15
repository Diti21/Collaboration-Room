import { PrismaClient } from '../../../collabroom-backend/generated/prisma';


const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, sender, channel } = body;

    let message;

    if (sender === 'you') {
      message = await prisma.youMessage.create({
        data: { content, channel },
      });
    } else if (sender === 'anonymous') {
      message = await prisma.anonymousMessage.create({
        data: { content, channel },
      });
    } else {
      return Response.json({ error: 'Invalid sender' }, { status: 400 });
    }

    return Response.json(message, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const youMessages = await prisma.youMessage.findMany({ orderBy: { createdAt: 'asc' } });
    const anonymousMessages = await prisma.anonymousMessage.findMany({ orderBy: { createdAt: 'asc' } });

    return Response.json({ youMessages, anonymousMessages });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
