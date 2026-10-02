import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';

const initialForm = { name: '', email: '', password: '', confirmPassword: '' };

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-100 px-4 py-12 text-neutral-500">
      <section className="w-full max-w-[420px] rounded-3xl bg-white px-7 py-10 shadow-[0_20px_60px_rgba(36,29,51,0.09)] sm:px-10">
        <div className="mx-auto w-full max-w-80">
          <p className="mb-3 caption font-semibold tracking-[0.2em] text-primary-700">WELCOME</p>
          <h1 className="title-sm text-neutral-500">회원가입</h1>
          <p className="mt-2 body-sm text-neutral-300">기본 정보를 입력하고 계정을 만들어 주세요.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input label="이름" name="name" value={form.name} onChange={updateField} placeholder="이름을 입력해 주세요" autoComplete="name" required />
            <Input label="이메일" name="email" type="email" value={form.email} onChange={updateField} placeholder="이메일을 입력해 주세요" autoComplete="email" required />
            <Input label="비밀번호" name="password" type="password" value={form.password} onChange={updateField} placeholder="8자 이상 입력해 주세요" autoComplete="new-password" minLength={8} required />
            <Input label="비밀번호 확인" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} placeholder="비밀번호를 다시 입력해 주세요" autoComplete="new-password" required />

            {error && <p role="alert" className="body-sm text-red-600">{error}</p>}
            {submitted && <p role="status" className="body-sm text-primary-700">입력 내용을 확인했습니다. 회원가입 API는 연결되지 않았습니다.</p>}

            <div className="pt-2">
              <Button text="회원가입" type="submit" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
