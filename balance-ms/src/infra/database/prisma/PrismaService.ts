import { PrismaClient } from "@prisma/client";

export default class PrismaService {
    private static instance: PrismaClient

    private constructor() {}

    public static getInstance(): PrismaClient {
        if(!PrismaService.instance) {
            PrismaService.instance = new PrismaClient({
                log: [
                    { level: 'query', emit: 'event' },
                    { level: 'error', emit: 'event' },
                    { level: 'info', emit: 'event' },
                    { level: 'warn', emit: 'event' },
                  ],
            })
        }

        PrismaService.instance.$on('query', (event: any) => {
            console.error(`Query: ${event.query}`)
            console.error(`Params: ${event.params}`)
            console.error(`Duration: ${event.duration}ms`)
        })

        PrismaService.instance.$on('error', (event: any) => {
            console.error(`Prisma Error: ${JSON.stringify(event)}`)
        })

        return PrismaService.instance
    }

    public static async disconnect() {
        if (this.instance) {
            await this.instance.$disconnect()
            console.info('Prisma connection closed')
        }
    }

    public static async clearDatabase(): Promise<void> {
        const prisma = this.getInstance()
        const tablenames = Object.keys(prisma).filter(key => key[0] !== "_")
        
        for (const tablename of tablenames) {
            if (tablename.startsWith("$")) continue
            
            try{
                await prisma[tablename].deleteMany()
            } catch (error) {
                console.warn(`Error cleaning table ${tablename}: ${error}`)
            }
        }
    }
}