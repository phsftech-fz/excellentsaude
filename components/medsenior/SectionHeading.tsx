type Props = {
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  dark?: boolean
  id?: string
}

export default function SectionHeading({ eyebrow, title, lead, align = 'left', dark = false, id }: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <span className={`ms-eyebrow ${dark ? 'text-ms-lime' : ''}`}>
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dark ? 'bg-ms-lime' : 'bg-ms-green-500'}`} />
        {eyebrow}
      </span>
      <h2 id={id} className={`ms-h2 mt-3 ${dark ? 'text-white' : ''}`}>{title}</h2>
      {lead && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-ms-green-100' : 'text-gray-600'}`}>{lead}</p>}
    </div>
  )
}
