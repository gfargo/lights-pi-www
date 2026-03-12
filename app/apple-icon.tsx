import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111827',
          borderRadius: '36px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FF9800', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M16 6 C12 6 9 9 9 13 C9 16 11 18.5 12.5 20 L12.5 23 C12.5 23.8 13.2 24.5 14 24.5 L18 24.5 C18.8 24.5 19.5 23.8 19.5 23 L19.5 20 C21 18.5 23 16 23 13 C23 9 20 6 16 6 Z M14.5 25.5 L17.5 25.5 C17.8 25.5 18 25.7 18 26 C18 26.3 17.8 26.5 17.5 26.5 L14.5 26.5 C14.2 26.5 14 26.3 14 26 C14 25.7 14.2 25.5 14.5 25.5 Z"
            fill="url(#grad)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
