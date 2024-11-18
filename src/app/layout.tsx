import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/theme/AppTheme';
import { SuperTokensInit } from '@/components/SuperTokensInit';


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SuperTokensInit>
            <AppTheme>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </AppTheme>
          </SuperTokensInit>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
