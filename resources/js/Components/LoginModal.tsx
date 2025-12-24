import React from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

export default function LoginModal({ show, onClose }: LoginModalProps) {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => onClose(),
        });
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Login
                </h2>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData(
                            'email',
                            e.target?.value
                        )}
                        className="mt-1 w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}


                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData(
                            'password',
                            e.target?.value
                        )}
                        className="mt-1 w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember */}
                <div className="mb-6 flex items-center gap-2">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData(
                            'remember',
                            e.target.checked
                        )}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember">
                        Remember me
                    </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-70"
                    >
                        Login
                    </button>
                </div>
            </form>
        </Modal>
    );
}

