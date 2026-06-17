import {
  SBadge,
  SButton,
  SCard,
  SChip,
  SIcon,
  STypography,
} from '@dmsej108/design-system'
import type { EventDetailValues } from '@/data/event-data'
import {
  formatBenefitAmount,
  formatEventPeriodDot,
  formatEventPeriodKorean,
  getEventLabel,
  getEventStatusBadge,
} from '@/data/event-labels'

type EventCustomerPreviewProps = {
  data: EventDetailValues;
};

const PRIZE_ITEMS = ['MEGA', 'BLACK', 'SHiny', 'MEGA', 'MEGA'];
const PRIZE_WEEKS = ['1주차', '2주차', '3주차', '4주차'];

function getBadgeVariant(tone: 'closing' | 'live' | 'draft') {
  if (tone === 'closing') return 'warning';
  if (tone === 'live') return 'info';
  return 'neutral';
}

export default function EventCustomerPreview({ data }: EventCustomerPreviewProps) {
  const badge = getEventStatusBadge(data);
  const targetLabel = data.targetDescription ?? getEventLabel('eventTarget', data.eventTarget);
  const prizeText = data.prizeDescription || formatBenefitAmount(data.benefitList, data.benefitAmount);

  return (
    <div className="event-customer-preview">
      <div className="event-customer-preview__toolbar">
        <span>고객 노출 화면</span>
        <em>{data.eventName}</em>
      </div>

      <div className="event-customer-preview__body">
        <article className="ev-page">
          <SCard variant="flat" size="large" className="ev-page__section">
            <header className="ev-page__header">
              <div className="ev-page__title-row">
                <STypography variant="h2" as="h1">
                  {data.eventName}
                </STypography>
                {badge && (
                  <SBadge variant={getBadgeVariant(badge.tone)} size="medium">
                    {badge.label}
                  </SBadge>
                )}
              </div>

              <div className="ev-page__meta">
                <div className="ev-page__meta-info">
                  <STypography variant="body2" color="muted">
                    이벤트기간 {formatEventPeriodDot(data.eventStartDate, data.eventEndDate)}
                  </STypography>
                  <STypography variant="body2" color="muted" className="ev-page__meta-divider">
                    |
                  </STypography>
                  <STypography variant="body2" color="muted">
                    조회 {data.viewCount}
                  </STypography>
                </div>

                <div className="ev-page__share" aria-label="공유하기">
                  <SButton variant="ghost" size="small" iconOnly aria-label="Facebook 공유">
                    <SIcon name="link" size="small" aria-hidden />
                  </SButton>
                  <SButton variant="ghost" size="small" iconOnly aria-label="Twitter 공유">
                    <SIcon name="send" size="small" aria-hidden />
                  </SButton>
                  <SButton variant="ghost" size="small" iconOnly aria-label="Blog 공유">
                    <SIcon name="externalLink" size="small" aria-hidden />
                  </SButton>
                  <SButton variant="ghost" size="small" iconOnly aria-label="Kakao 공유">
                    <SIcon name="users" size="small" aria-hidden />
                  </SButton>
                </div>
              </div>
            </header>
          </SCard>

          <SCard variant="raised" size="large" className="ev-page__banner">
            <STypography variant="overline" color="warning">
              {data.eventBannerDescription || '이벤트 배너'}
            </STypography>
            <STypography variant="h3" as="p" style={{ marginTop: 'var(--space-2)' }}>
              {data.eventName}
            </STypography>
            <STypography variant="body2" color="secondary" style={{ marginTop: 'var(--space-2)' }}>
              {data.benefitAmount || prizeText}
            </STypography>
          </SCard>

          <SCard variant="flat" size="large" className="ev-page__section">
            <dl className="ev-page__info">
              <div className="ev-page__info-row">
                <STypography variant="label" color="error" as="dt">
                  이벤트 기간
                </STypography>
                <STypography variant="body1" as="dd">
                  {formatEventPeriodKorean(data.eventStartDate, data.eventEndDate)}
                </STypography>
              </div>
              <div className="ev-page__info-row">
                <STypography variant="label" color="error" as="dt">
                  이벤트 대상
                </STypography>
                <STypography variant="body1" as="dd">
                  {targetLabel}
                </STypography>
              </div>
              <div className="ev-page__info-row">
                <STypography variant="label" color="error" as="dt">
                  참여 방법
                </STypography>
                <dd>
                  {data.participationSteps.length > 0 ? (
                    <ol className="ev-page__steps">
                      {data.participationSteps.map((step, index) => (
                        <li key={`${step}-${index}`}>
                          <STypography variant="body1" as="span">
                            {step}
                          </STypography>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <STypography variant="body1" as="span">
                      {`${data.buttonName || '참여하기'} 버튼을 눌러 참여`}
                    </STypography>
                  )}
                </dd>
              </div>
              <div className="ev-page__info-row">
                <STypography variant="label" color="error" as="dt">
                  이벤트 경품
                </STypography>
                <STypography variant="body1" as="dd">
                  {prizeText}
                </STypography>
              </div>
            </dl>
          </SCard>

          <SCard variant="sunken" size="large" title="경품 안내" className="ev-page__section">
            <div className="ev-page__prize-top">
              {PRIZE_ITEMS.map((item, index) => (
                <SCard key={`${item}-${index}`} variant="raised" size="small" className="ev-page__prize-box">
                  <STypography variant="body2" as="p" style={{ textAlign: 'center', fontWeight: 700 }}>
                    {item}
                  </STypography>
                </SCard>
              ))}
            </div>

            <div className="ev-page__prize-weeks">
              {PRIZE_WEEKS.map((week) => (
                <div key={week} className="ev-page__prize-week-item">
                  <SChip label={week} variant="error" size="small" className="ev-page__prize-week-chip" />
                  <SCard variant="flat" size="small" className="ev-page__prize-week-card">
                    <STypography variant="body2" as="p" style={{ textAlign: 'center' }}>
                      {data.benefitAmount || '경품'}
                    </STypography>
                  </SCard>
                </div>
              ))}
            </div>
          </SCard>

          {data.buttonName && (
            <div className="ev-page__action">
              <SButton variant="primary" size="large">
                {data.buttonName}
              </SButton>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
