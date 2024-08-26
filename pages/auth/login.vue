<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import useRelativeCallbackUrl from '~/composables/use-relative-callback';

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})

useSeoMeta({
    title: 'Login'
})

const toast = useToast()
const { signIn } = useAuth()

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(5, 'Password must be at least 5 characters'),
})

type Schema = z.output<typeof schema>

const signInResult = ref()
const state = reactive({
    email: 'john@doe.com',
    password: '12345'
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    signInResult.value = await signIn("credentials", {
        email: event.data.email,
        password: event.data.password,
        redirect: false,
    })
    if (signInResult.value.error) {
        toast.add({
            id: 'invalid_credentials',
            title: `Invalid credentials`,
            icon: 'i-material-symbols:warning',
            timeout: 2000,
        })
        return
    }
    toast.add({
        id: 'logged_in',
        title: `Succesfully logged in`,
        icon: 'i-material-symbols:check-box-sharp',
        timeout: 2000,
    })
    await navigateTo(useRelativeCallbackUrl(useRoute()).value)
}
</script>

<template>
    <div>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your
                    account</h2>
            </div>
            <UForm @submit="onSubmit" :schema="schema" :state="state"
                class="space-y-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" placeholder="john@doe.com" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" type="password" placeholder="12345" />
                </UFormGroup>

                <UButton type="submit">
                    Submit
                </UButton>
            </UForm>
        </div>
    </div>
</template>