'use client'

import { useEffect, useState } from 'react'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FormButton from '@/components/FormButton'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const [state, action] = useFormState(login, { success: false })
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success('Login successful')
            router.push('/dashboard')
        } else if (state.cretentailsError) {
            toast.error(state.cretentailsError)
        }
    }, [state, router])

    return (
        <>
            <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
                <div className="mx-auto">
                    <Card>
                        <CardHeader>
                            <h1 className="text-2xl font-bold text-center">Login</h1>
                        </CardHeader>
                        <CardContent>
                            <form action={action} className='space-y-4'>
                                <div>
                                    <label htmlFor="username" className="font-medium text-sm text-gray-600">
                                        Username
                                    </label>
                                    <Input type="text" id="username" name="username" placeholder='example@example.com' defaultValue="admin" className='min-w-80 mt-1' />
                                    {state.errors?.username && <p className='text-red-500 text-sm'>{state.errors.password}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="font-medium text-sm text-gray-600">
                                        Password
                                    </label>
                                    <Input type="password" id="password" name="password" placeholder='*******' defaultValue="Test123!@#" className='min-w-80 mt-1' />
                                    {state.errors?.password && <p className='text-red-500 text-sm'>{state.errors.password}</p>}
                                </div>
                                <FormButton text='Login' className='w-full' />
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default LoginPage