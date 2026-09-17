import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from 'lucide-react'

const announcements = [
  {
    tag: 'Comunicado',
    title: 'Feira de projetos acontece na próxima sexta',
    date: '18 set 2026',
    color: 'bg-[#e6f1ff] text-[#1d5c9f]',
  },
  {
    tag: 'Atividade',
    title: 'Entrega do trabalho de Fundamentos da Web',
    date: '22 set 2026',
    color: 'bg-[#e6f6ef] text-[#23704b]',
  },
  {
    tag: 'Atenção',
    title: 'Atualização do calendário acadêmico',
    date: 'Publicado hoje',
    color: 'bg-[#fff1dc] text-[#9a5c16]',
  },
]

const quickQuestions = ['Qual é a próxima atividade?', 'Onde vejo os comunicados?', 'Como falar com a secretaria?']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Olá! Sou a assistente FICR. Como posso ajudar?')

  function askQuestion(event) {
    event.preventDefault()
    const normalizedQuestion = question.trim()

    if (!normalizedQuestion) return

    setAnswer(`Recebi sua dúvida sobre “${normalizedQuestion}”. Em breve vou consultar a base oficial da instituição para responder com segurança.`)
    setQuestion('')
  }

  function selectQuestion(selectedQuestion) {
    setQuestion(selectedQuestion)
    setChatOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#15243b]">
      <header className="border-b border-[#dce6f2] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="FICR Edu início">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173f70] text-white shadow-lg shadow-[#173f70]/20">
              <GraduationCap size={22} strokeWidth={2.2} />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight text-[#173f70]">FICR <span className="text-[#276ef1]">Edu</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#72839a]">Portal acadêmico</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#53657b] md:flex" aria-label="Navegação principal">
            <a className="text-[#173f70]" href="#inicio">Início</a>
            <a className="transition hover:text-[#276ef1]" href="#agenda">Agenda</a>
            <a className="transition hover:text-[#276ef1]" href="#comunicados">Comunicados</a>
            <a className="transition hover:text-[#276ef1]" href="#ajuda">Ajuda</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[#dce6f2] text-[#53657b] transition hover:border-[#276ef1] hover:text-[#276ef1] sm:flex" aria-label="Notificações">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ef7b55]" />
            </button>
            <button className="hidden items-center gap-2 rounded-full bg-[#edf4fc] py-2 pl-2 pr-4 text-sm font-bold text-[#173f70] sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#276ef1] text-xs text-white">MA</span>
              Fábio Nascimento
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce6f2] text-[#173f70] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#dce6f2] px-5 py-4 md:hidden" aria-label="Navegação mobile">
            <div className="flex flex-col gap-4 text-sm font-semibold text-[#53657b]">
              <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
              <a href="#agenda" onClick={() => setMenuOpen(false)}>Agenda</a>
              <a href="#comunicados" onClick={() => setMenuOpen(false)}>Comunicados</a>
              <a href="#ajuda" onClick={() => setMenuOpen(false)}>Ajuda</a>
            </div>
          </nav>
        )}
      </header>

      <main id="inicio" className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8 lg:pt-12">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#173f70] px-6 py-10 text-white shadow-2xl shadow-[#173f70]/15 sm:px-10 lg:px-14 lg:py-14">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#b9d5f7]">
              <Sparkles size={14} /> Seu espaço de aprendizagem
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-6xl">Sua jornada acadêmica, mais simples.</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#d2e2f4] sm:text-lg">Acompanhe sua rotina, encontre comunicados importantes e tire dúvidas sem perder tempo.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-[#f4b942] px-5 py-3 text-sm font-bold text-[#173f70] transition hover:bg-[#ffd16c]">
                <MessageCircle size={17} /> Tirar uma dúvida
              </button>
              <a href="#agenda" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Ver minha agenda <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[38px] border-[#276ef1]/30" />
          <div className="absolute -bottom-28 right-24 h-64 w-64 rounded-full border-[28px] border-[#f4b942]/20" />
          <div className="absolute bottom-7 right-10 hidden w-52 rotate-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between text-xs text-[#c5d9ef]"><span>Presença no semestre</span><Check size={15} className="text-[#9ee0bd" /></div>
            <div className="mt-3 h-2 rounded-full bg-white/15"><div className="h-2 w-[92%] rounded-full bg-[#f4b942]" /></div>
            <p className="mt-2 text-right text-xs font-bold text-white">92% de presença</p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3" aria-label="Resumo acadêmico">
          <SummaryCard icon={<CalendarDays size={20} />} label="Próxima aula" value="Fundamentos da Web" detail="Hoje, 19:00 · Sala 204" />
          <SummaryCard icon={<BookOpen size={20} />} label="Atividades abertas" value="3 entregas" detail="A mais próxima vence em 5 dias" />
          <SummaryCard icon={<Clock3 size={20} />} label="Horas estudadas" value="24h 30min" detail="+12% em relação ao último mês" />
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <section id="agenda">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#276ef1]">Organize seu tempo</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-[#173f70]">Próximos compromissos</h2></div>
              <a href="#agenda" className="hidden items-center gap-1 text-sm font-bold text-[#276ef1] sm:flex">Ver agenda completa <ChevronRight size={16} /></a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#dce6f2] bg-white">
              <ScheduleRow day="18" month="SET" title="Fundamentos da Web" description="Aula presencial · Sala 204" time="19:00" accent="bg-[#276ef1]" />
              <ScheduleRow day="20" month="SET" title="Laboratório de interfaces" description="Atividade prática · Laboratório 2" time="14:00" accent="bg-[#38a88a]" />
              <ScheduleRow day="22" month="SET" title="Entrega: Projeto de UX" description="Submissão online · Ambiente virtual" time="23:59" accent="bg-[#ef7b55]" last />
            </div>
          </section>

          <section id="comunicados">
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#276ef1]">Fique por dentro</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-[#173f70]">Comunicados</h2></div><button className="text-sm font-bold text-[#276ef1]">Ver todos</button></div>
            <div className="space-y-3">{announcements.map((item) => <Announcement key={item.title} {...item} />)}</div>
          </section>
        </div>

        <section id="ajuda" className="mt-14 rounded-2xl border border-[#dce6f2] bg-[#edf4fc] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl"><div className="flex items-center gap-2 text-[#276ef1]"><Sparkles size={18} /><span className="text-xs font-bold uppercase tracking-[0.16em]">Assistente FICR</span></div><h2 className="mt-2 text-2xl font-bold tracking-tight text-[#173f70]">Tem alguma dúvida?</h2><p className="mt-2 text-sm leading-6 text-[#53657b]">Pergunte sobre aulas, atividades, prazos ou comunicados. O assistente consulta as informações oficiais para orientar você.</p></div>
            <button onClick={() => setChatOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#276ef1] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#276ef1]/20 transition hover:bg-[#1d5cbb]"><MessageCircle size={17} /> Conversar agora</button>
          </div>
        </section>
      </main>

      {chatOpen && <ChatPanel answer={answer} question={question} setQuestion={setQuestion} askQuestion={askQuestion} selectQuestion={selectQuestion} onClose={() => setChatOpen(false)} />}
    </div>
  )
}

function SummaryCard({ icon, label, value, detail }) {
  return <article className="rounded-2xl border border-[#dce6f2] bg-white p-5 shadow-sm"><div className="flex items-center gap-3 text-[#276ef1]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf4fc]">{icon}</span><span className="text-xs font-bold uppercase tracking-[0.12em] text-[#72839a]">{label}</span></div><p className="mt-4 text-xl font-bold text-[#173f70]">{value}</p><p className="mt-1 text-sm text-[#72839a]">{detail}</p></article>
}

function ScheduleRow({ day, month, title, description, time, accent, last }) {
  return <article className={`flex items-center gap-4 p-5 sm:gap-5 ${last ? '' : 'border-b border-[#edf1f6]'}`}><div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-white ${accent}`}><strong className="text-xl leading-none">{day}</strong><span className="mt-1 text-[10px] font-bold tracking-widest">{month}</span></div><div className="min-w-0 flex-1"><h3 className="truncate font-bold text-[#173f70]">{title}</h3><p className="mt-1 truncate text-sm text-[#72839a]">{description}</p></div><time className="shrink-0 text-sm font-bold text-[#53657b]">{time}</time></article>
}

function Announcement({ tag, title, date, color }) {
  return <article className="rounded-2xl border border-[#dce6f2] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${color}`}>{tag}</span><span className="text-xs text-[#8b9aae]">{date}</span></div><h3 className="mt-3 text-sm font-bold leading-5 text-[#173f70]">{title}</h3><button className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#276ef1]">Ler comunicado <ArrowUpRight size={13} /></button></article>
}

function ChatPanel({ answer, question, setQuestion, askQuestion, selectQuestion, onClose }) {
  return <aside className="fixed bottom-4 right-4 z-20 flex w-[calc(100%-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[#dce6f2] bg-white shadow-2xl shadow-[#173f70]/20" aria-label="Assistente FICR"><div className="flex items-center justify-between bg-[#173f70] px-5 py-4 text-white"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276ef1]"><Sparkles size={18} /></span><div><p className="text-sm font-bold">Assistente FICR</p><p className="text-xs text-[#b9d5f7]">Online para ajudar</p></div></div><button onClick={onClose} className="text-[#b9d5f7] transition hover:text-white" aria-label="Fechar assistente"><X size={19} /></button></div><div className="max-h-[23rem] space-y-4 overflow-y-auto p-5"><div className="rounded-2xl rounded-tl-sm bg-[#edf4fc] p-3 text-sm leading-5 text-[#385572]">{answer}</div><div><p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8b9aae]">Perguntas rápidas</p><div className="flex flex-wrap gap-2">{quickQuestions.map((item) => <button key={item} onClick={() => selectQuestion(item)} className="rounded-full border border-[#dce6f2] px-3 py-2 text-left text-xs font-semibold text-[#53657b] transition hover:border-[#276ef1] hover:text-[#276ef1]">{item}</button>)}</div></div></div><form onSubmit={askQuestion} className="flex gap-2 border-t border-[#edf1f6] p-4"><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Digite sua dúvida..." className="min-w-0 flex-1 rounded-xl border border-[#dce6f2] bg-[#f7f9fc] px-3 py-2.5 text-sm outline-none transition placeholder:text-[#9aaabd] focus:border-[#276ef1]" aria-label="Sua dúvida" /><button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#276ef1] text-white transition hover:bg-[#1d5cbb]" aria-label="Enviar dúvida"><Send size={17} /></button></form></aside>
}

export default App