import { mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import prisma from '@infra/database/prisma/prisma.client'

jest.mock('@infra/database/prisma/prisma.client', () => ({
    __esModule: true,
    default: jest.fn(() => mockDeep<PrismaClient>())
}))

export const prismaMock = mockDeep<PrismaClient>()

beforeEach(() => {
    mockReset(prismaMock)
})

export default prisma