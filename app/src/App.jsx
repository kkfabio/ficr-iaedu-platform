import { useState, useEffect, useRef } from 'react'
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const announcements = [
  {
    id: 1,
    tag: 'Comunicado',
    title: 'Feira de projetos acontece na próxima sexta',
    date: '18 set 2026',
    body: 'A comunidade acadêmica está convidada para conhecer os projetos desenvolvidos pelos estudantes.',
    color: 'bg-[#e6f1ff] text-[#1d5c9f]',
  },
  {
    id: 2,
    tag: 'Atividade',
    title: 'Entrega do trabalho de Fundamentos da Web',
    date: '22 set 2026',
    body: 'A submissão deve ser feita pelo ambiente virtual até às 23:59 do dia da entrega.',
    color: 'bg-[#e6f6ef] text-[#23704b]',
  },
  {
    id: 3,
    tag: 'Atenção',
    title: 'Atualização do calendário acadêmico',
    date: 'Publicado hoje',
    body: 'Confira as alterações de datas e programe suas próximas atividades com antecedência.',
    color: 'bg-[#fff1dc] text-[#9a5c16]',
  },
  {
    id: 4,
    tag: 'Evento',
    title: 'Roda de conversa sobre carreira em tecnologia',
    date: '25 set 2026',
    body: 'Profissionais convidados vão compartilhar experiências sobre o início da carreira na área de tecnologia.',
    color: 'bg-[#f2eaff] text-[#7141a5]',
  },
]

const scheduleItems = [
  { id: 1, day: '18', month: 'SET', title: 'Fundamentos da Web', description: 'Aula presencial · Sala 204', time: '19:00', type: 'Aula', accent: 'bg-[#276ef1]' },
  { id: 2, day: '20', month: 'SET', title: 'Laboratório de interfaces', description: 'Atividade prática · Laboratório 2', time: '14:00', type: 'Atividade', accent: 'bg-[#38a88a]' },
  { id: 3, day: '22', month: 'SET', title: 'Entrega: Projeto de UX', description: 'Submissão online · Ambiente virtual', time: '23:59', type: 'Entrega', accent: 'bg-[#ef7b55]' },
  { id: 4, day: '25', month: 'SET', title: 'Roda de conversa sobre carreira', description: 'Evento acadêmico · Auditório principal', time: '18:30', type: 'Evento', accent: 'bg-[#8b63c7]' },
  { id: 5, day: '29', month: 'SET', title: 'Avaliação de Desenvolvimento Web', description: 'Prova presencial · Sala 205', time: '19:00', type: 'Avaliação', accent: 'bg-[#173f70]' },
]

const quickQuestions = ['Qual é a próxima atividade?', 'Onde vejo os comunicados?', 'Como falar com a secretaria?']
const assistantApiUrl = import.meta.env.VITE_ASSISTANT_API_URL || 'http://localhost:8080/api/chat'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Olá! Sou a assistente inteligente da FICR. Posso tirar dúvidas sobre calendário letivo, datas de provas, horários, comunicados, contatos da secretaria e normas acadêmicas. Como posso ajudar?',
    },
  ])
  const [isAsking, setIsAsking] = useState(false)

  async function askQuestion(event, customQuestion) {
    if (event) event.preventDefault()
    const queryText = (customQuestion || question).trim()

    if (!queryText || isAsking) return

    const userMsg = { id: Date.now(), role: 'user', content: queryText }
    const nextHistory = [...messages, userMsg]
    setMessages(nextHistory)
    setQuestion('')
    setIsAsking(true)

    const historyPayload = nextHistory.slice(0, -1).map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const response = await fetch(assistantApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: queryText, history: historyPayload }),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.answer || 'Não consegui encontrar uma resposta para essa dúvida.',
        },
      ])
    } catch (error) {
      console.error('Falha ao consultar o assistente:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Não foi possível conectar ao backend da assistente. Verifique se o servidor Spring Boot está rodando na porta 8080.',
        },
      ])
    } finally {
      setIsAsking(false)
    }
  }

  function selectQuestion(selectedQuestion) {
    setChatOpen(true)
    askQuestion(null, selectedQuestion)
  }

  function navigate(page) {
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#15243b]">
      <header className="border-b border-[#dce6f2] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 text-left" aria-label="FICR Edu início">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173f70] text-white shadow-lg shadow-[#173f70]/20">
              <GraduationCap size={22} strokeWidth={2.2} />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight text-[#173f70]">FICR <span className="text-[#276ef1]">Edu</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#72839a]">Portal acadêmico</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#53657b] md:flex" aria-label="Navegação principal">
            <button className={activePage === 'home' ? 'text-[#173f70]' : 'transition hover:text-[#276ef1]'} onClick={() => navigate('home')}>Início</button>
            <button className={activePage === 'agenda' ? 'text-[#173f70]' : 'transition hover:text-[#276ef1]'} onClick={() => navigate('agenda')}>Agenda</button>
            <button className={activePage === 'announcements' ? 'text-[#173f70]' : 'transition hover:text-[#276ef1]'} onClick={() => navigate('announcements')}>Comunicados</button>
            <button className={activePage === 'help' ? 'text-[#173f70]' : 'transition hover:text-[#276ef1]'} onClick={() => navigate('help')}>Ajuda</button>
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
              <button className="text-left" onClick={() => navigate('home')}>Início</button>
              <button className="text-left" onClick={() => navigate('agenda')}>Agenda</button>
              <button className="text-left" onClick={() => navigate('announcements')}>Comunicados</button>
              <button className="text-left" onClick={() => navigate('help')}>Ajuda</button>
            </div>
          </nav>
        )}
      </header>

      <main id={activePage} className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8 lg:pt-12">
        {activePage === 'home' ? <>
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
              <button onClick={() => navigate('agenda')} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Ver minha agenda <ArrowUpRight size={17} />
              </button>
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
              <button onClick={() => navigate('agenda')} className="hidden items-center gap-1 text-sm font-bold text-[#276ef1] sm:flex">Ver agenda completa <ChevronRight size={16} /></button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#dce6f2] bg-white">
              {scheduleItems.slice(0, 3).map((item, index) => <ScheduleRow key={item.id} {...item} last={index === 2} />)}
            </div>
          </section>

          <section id="comunicados">
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#276ef1]">Fique por dentro</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-[#173f70]">Comunicados</h2></div><button onClick={() => navigate('announcements')} className="text-sm font-bold text-[#276ef1]">Ver todos</button></div>
            <div className="space-y-3">{announcements.slice(0, 3).map((item) => <Announcement key={item.title} {...item} />)}</div>
          </section>
        </div>

        <section id="ajuda" className="mt-14 rounded-2xl border border-[#dce6f2] bg-[#edf4fc] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl"><div className="flex items-center gap-2 text-[#276ef1]"><Sparkles size={18} /><span className="text-xs font-bold uppercase tracking-[0.16em]">Assistente FICR</span></div><h2 className="mt-2 text-2xl font-bold tracking-tight text-[#173f70]">Tem alguma dúvida?</h2><p className="mt-2 text-sm leading-6 text-[#53657b]">Pergunte sobre aulas, atividades, prazos ou comunicados. O assistente consulta as informações oficiais para orientar você.</p></div>
            <button onClick={() => setChatOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#276ef1] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#276ef1]/20 transition hover:bg-[#1d5cbb]"><MessageCircle size={17} /> Conversar agora</button>
          </div>
        </section>
        </> : activePage === 'agenda' ? <AgendaPage /> : activePage === 'announcements' ? <AnnouncementsPage /> : <HelpPage onChat={() => setChatOpen(true)} />}
      </main>

      {chatOpen && <ChatPanel messages={messages} question={question} setQuestion={setQuestion} askQuestion={askQuestion} selectQuestion={selectQuestion} isAsking={isAsking} onClose={() => setChatOpen(false)} />}
    </div>
  )
}

function PageIntro({ eyebrow, title, description, icon }) {
  return <section className="mb-8 flex flex-col justify-between gap-6 rounded-[1.75rem] bg-[#173f70] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex-row lg:items-end"><div className="max-w-2xl"><div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#b9d5f7]">{icon}{eyebrow}</div><h1 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#d2e2f4] sm:text-base">{description}</p></div><div className="hidden h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#f4b942] lg:flex">{icon}</div></section>
}

function AgendaPage() {
  const [filter, setFilter] = useState('Todos')
  const filters = ['Todos', 'Aula', 'Atividade', 'Entrega', 'Evento', 'Avaliação']
  const filteredItems = filter === 'Todos' ? scheduleItems : scheduleItems.filter((item) => item.type === filter)

  return <>
    <PageIntro eyebrow="Planejamento acadêmico" title="Sua agenda em um só lugar" description="Acompanhe aulas, entregas e eventos importantes para organizar sua semana com tranquilidade." icon={<CalendarDays size={18} />} />
    <div className="mb-6 flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === item ? 'bg-[#276ef1] text-white shadow-lg shadow-[#276ef1]/15' : 'border border-[#dce6f2] bg-white text-[#53657b] hover:border-[#276ef1] hover:text-[#276ef1]'}`}>{item}</button>)}</div>
    <section className="overflow-hidden rounded-2xl border border-[#dce6f2] bg-white"><div className="flex items-center justify-between border-b border-[#edf1f6] px-5 py-4"><div><h2 className="font-bold text-[#173f70]">Setembro de 2026</h2><p className="mt-1 text-sm text-[#72839a]">{filteredItems.length} compromissos encontrados</p></div><button className="inline-flex items-center gap-2 rounded-xl border border-[#dce6f2] px-3 py-2 text-sm font-bold text-[#53657b]"><DownloadIcon /> Exportar</button></div><div>{filteredItems.map((item, index) => <ScheduleRow key={item.id} {...item} last={index === filteredItems.length - 1} />)}</div></section>
    <section className="mt-8 grid gap-4 sm:grid-cols-3"><MiniInfo icon={<MapPin size={18} />} title="Aulas presenciais" text="Confira a sala antes de sair." /><MiniInfo icon={<FileText size={18} />} title="Entregas" text="Você tem 2 prazos esta semana." /><MiniInfo icon={<Bell size={18} />} title="Lembretes" text="Ative avisos para não esquecer." /></section>
  </>
}

function AnnouncementsPage() {
  const [search, setSearch] = useState('')
  const filteredAnnouncements = announcements.filter((item) => `${item.title} ${item.tag} ${item.body}`.toLowerCase().includes(search.toLowerCase()))

  return <>
    <PageIntro eyebrow="Informação oficial" title="Comunicados e novidades" description="Tudo o que você precisa saber sobre a rotina acadêmica, em uma fonte clara e organizada." icon={<Bell size={18} />} />
    <div className="relative mb-6 max-w-xl"><Search className="absolute left-4 top-3.5 text-[#8b9aae]" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar comunicados..." className="w-full rounded-xl border border-[#dce6f2] bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#276ef1]" /></div>
    <div className="grid gap-4 md:grid-cols-2">{filteredAnnouncements.map((item) => <AnnouncementCard key={item.id} {...item} />)}</div>
    {!filteredAnnouncements.length && <EmptyState text="Nenhum comunicado encontrado para essa busca." />}
  </>
}

function HelpPage({ onChat }) {
  const [openQuestion, setOpenQuestion] = useState(0)
  const questions = [
    ['Como acompanho minhas atividades?', 'Acesse a Agenda para ver prazos e selecione uma atividade para consultar os detalhes da entrega.'],
    ['Onde encontro os comunicados oficiais?', 'A página Comunicados reúne avisos acadêmicos, eventos e atualizações importantes da instituição.'],
    ['Como entro em contato com a secretaria?', 'Use o botão de contato abaixo ou converse com o Assistente FICR para encontrar o canal correto.'],
    ['A assistente substitui o atendimento humano?', 'Não. A assistente orienta dúvidas frequentes e encaminha situações que precisam de atendimento especializado.'],
  ]

  return <>
    <PageIntro eyebrow="Central de suporte" title="Como podemos ajudar?" description="Encontre respostas rápidas ou fale com a assistente FICR sobre sua rotina acadêmica." icon={<CircleHelp size={18} />} />
    <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]"><section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#276ef1]">Perguntas frequentes</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-[#173f70]">Respostas para começar</h2></div><div className="overflow-hidden rounded-2xl border border-[#dce6f2] bg-white">{questions.map(([question, response], index) => <div key={question} className="border-b border-[#edf1f6] last:border-0"><button onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#173f70]"><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[#276ef1] transition ${openQuestion === index ? 'rotate-180' : ''}`} /></button>{openQuestion === index && <p className="px-5 pb-5 text-sm leading-6 text-[#72839a]">{response}</p>}</div>)}</div></section><aside className="rounded-2xl bg-[#edf4fc] p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#276ef1] text-white"><Sparkles size={20} /></span><h2 className="mt-5 text-xl font-bold text-[#173f70]">Ainda ficou com dúvida?</h2><p className="mt-2 text-sm leading-6 text-[#53657b]">Nossa assistente está pronta para orientar você a qualquer momento.</p><button onClick={onChat} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#276ef1] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1d5cbb]"><MessageCircle size={17} /> Conversar com a assistente</button><button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#c9d9eb] px-4 py-3 text-sm font-bold text-[#173f70] transition hover:bg-white"><Users size={17} /> Falar com a secretaria</button></aside></div>
  </>
}

function DownloadIcon() {
  return <Download size={16} className="text-[#276ef1]" />
}

function MiniInfo({ icon, title, text }) {
  return <article className="rounded-2xl border border-[#dce6f2] bg-white p-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf4fc] text-[#276ef1]">{icon}</span><h3 className="mt-3 text-sm font-bold text-[#173f70]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#72839a]">{text}</p></article>
}

function AnnouncementCard({ tag, title, date, body, color }) {
  return <article className="rounded-2xl border border-[#dce6f2] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${color}`}>{tag}</span><span className="text-xs text-[#8b9aae]">{date}</span></div><h2 className="mt-5 text-lg font-bold leading-6 text-[#173f70]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#72839a]">{body}</p><button className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#276ef1]">Ler comunicado <ArrowUpRight size={13} /></button></article>
}

function EmptyState({ text }) {
  return <div className="rounded-2xl border border-dashed border-[#c9d9eb] bg-white p-10 text-center text-sm text-[#72839a]">{text}</div>
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

function ChatPanel({ messages, question, setQuestion, askQuestion, selectQuestion, isAsking, onClose }) {
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isAsking])

  return (
    <aside className="fixed bottom-4 right-4 z-30 flex h-[34rem] w-[calc(100%-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-[#dce6f2] bg-white shadow-2xl shadow-[#173f70]/25" aria-label="Assistente FICR">
      <div className="flex items-center justify-between bg-[#173f70] px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276ef1]">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-sm font-bold">Assistente FICR · IA</p>
            <p className="text-xs text-[#b9d5f7]">Google Gemini Integrado</p>
          </div>
        </div>
        <button onClick={onClose} className="text-[#b9d5f7] transition hover:text-white" aria-label="Fechar assistente">
          <X size={19} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'rounded-tr-sm bg-[#276ef1] text-white shadow-sm'
                  : 'rounded-tl-sm border border-[#dce6f2] bg-[#edf4fc] text-[#15243b]'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isAsking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-[#dce6f2] bg-[#edf4fc] px-4 py-3 text-xs text-[#53657b]">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#276ef1]" />
              Consultando base institucional da FICR...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-[#edf1f6] bg-[#fafcff] px-4 py-2.5">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b9aae]">Sugestões rápidas</p>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((item) => (
            <button
              key={item}
              onClick={() => selectQuestion(item)}
              disabled={isAsking}
              className="rounded-full border border-[#dce6f2] bg-white px-2.5 py-1 text-left text-xs font-semibold text-[#53657b] transition hover:border-[#276ef1] hover:text-[#276ef1] disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={askQuestion} className="flex gap-2 border-t border-[#edf1f6] p-3">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={isAsking ? 'Aguarde a resposta...' : 'Digite sua dúvida...'}
          disabled={isAsking}
          className="min-w-0 flex-1 rounded-xl border border-[#dce6f2] bg-[#f7f9fc] px-3.5 py-2.5 text-sm outline-none transition placeholder:text-[#9aaabd] focus:border-[#276ef1] disabled:opacity-60"
          aria-label="Sua dúvida"
        />
        <button
          type="submit"
          disabled={isAsking || !question.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#276ef1] text-white transition hover:bg-[#1d5cbb] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar dúvida"
        >
          <Send size={17} />
        </button>
      </form>
    </aside>
  )
}

export default App