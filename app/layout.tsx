import type {Metadata} from 'next';
import './globals.css';
import './responsive.css';
export const metadata:Metadata={title:'FAEX Git Lab',description:'Simulador educacional de Git para Engenharia de Software'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
