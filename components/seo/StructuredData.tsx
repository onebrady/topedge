import Script from 'next/script'

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${JSON.stringify(data).substring(0, 20)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
