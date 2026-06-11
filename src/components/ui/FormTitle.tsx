import type { CSSProperties } from 'react'

export interface SFormTitleProps {
  title: string
  style?: CSSProperties
}

export default function FormTitle({ title, style }: SFormTitleProps) {
  return (
    <div className="ui-title-3" style={style}>
      <h3>{title}</h3>
      <div className="abs title-required">
        <span className="ess" /> 표시는 필수항목입니다.
      </div>
    </div>
  )
}
