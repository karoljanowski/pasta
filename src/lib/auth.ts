'use server'

import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'
import { z } from 'zod'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import { ChangePasswordFormState, LoginFormState } from './types'
import { error } from 'console'

const prisma = new PrismaClient()

const SECRET_KEY = process.env.JWT_SECRET_KEY
if (!SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not set')
}

const LoginSchema = z.object({
    username: z.string().min(1, 'Username cannot be empty'),
    password: z.string().min(1, 'Password cannot be empty'),
})

export const login = async (state: LoginFormState,formData: FormData) => {
    const parsedData = LoginSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })
    
    if(parsedData.success === false) {
        return { 
            success: false,
            errors: parsedData.error.flatten().fieldErrors
        }
    }

    const { username, password } = parsedData.data

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, cretentailsError: 'Invalid credentials' }
    }

    const token = await new SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(SECRET_KEY))

    cookies().set('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600
    })

    return { success: true }
}

export const logout = async () => {
  cookies().delete('token')
  return { success: true }
}

const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(1, 'Old password cannot be empty'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Confirm password cannot be empty'),
})

export const changePassword = async (state: ChangePasswordFormState, formData: FormData) => {
    const parsedData = ChangePasswordSchema.safeParse({
        oldPassword: formData.get('oldPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if(parsedData.success === false) {
        return { 
            success: false,
            errors: parsedData.error.flatten().fieldErrors
        }
    }

    const { oldPassword, newPassword, confirmPassword } = parsedData.data

    if(newPassword !== confirmPassword) {
        return { success: false, error: 'Passwords do not match' }
    }

    const user = await prisma.user.findUnique({ where: { username: 'admin' } })

    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
        return { success: false, error: 'Invalid old password' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
    })

    return { success: true }
}
