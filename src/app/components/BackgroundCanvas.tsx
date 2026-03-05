"use client"
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface Mouse {
    x: number | null;
    y: number | null;
    radio: number;
}

interface Props {
    children?: React.ReactNode;
}

const BackgroundCanvas: React.FC<Props> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let figuras: Figura[] = [];
        let width = 0;
        let height = 0;
        let animationFrameId: number;        
        const mouse: Mouse = { x: null, y: null, radio: 200 };
        const coloresLight = ['#4285F4', '#34A853', '#EA4335', '#FBBC05'];
        const backgroundColor = theme === 'dark' ? '#0d0d0d' : '#F8F7F4';
        class Figura {
            x: number; y: number; tamano: number; tipo: number;
            vX: number; vY: number; opacidad: number; angulo: number;
            velocidadRotacion: number; colorBase: string;
            constructor(canvasW: number, canvasH: number) {
                this.x = Math.random() * canvasW;
                this.y = Math.random() * canvasH;
                this.tamano = Math.random() * 50 + 20;
                this.tipo = Math.floor(Math.random() * 3);
                this.vX = (Math.random() - 0.5) * 1.2;
                this.vY = (Math.random() - 0.5) * 1.2;
                this.opacidad = Math.random() * 0.4 + 0.2;
                this.angulo = Math.random() * Math.PI * 2;
                this.velocidadRotacion = (Math.random() - 0.5) * 0.02;
                if (theme === 'dark') {
                    this.colorBase = '255, 255, 255';
                } else {
                    this.colorBase = coloresLight[Math.floor(Math.random() * coloresLight.length)];
                }
            }

            dibujar(contexto: CanvasRenderingContext2D) {
                contexto.save();
                contexto.translate(this.x, this.y);
                contexto.rotate(this.angulo);    
                
                if (theme === 'dark') {
                    contexto.fillStyle = `rgba(${this.colorBase}, ${this.opacidad})`;
                    contexto.strokeStyle = `rgba(${this.colorBase}, ${this.opacidad})`;
                } else {
                    contexto.globalAlpha = this.opacidad;
                    contexto.fillStyle = this.colorBase;
                    contexto.strokeStyle = this.colorBase;
                }
                
                contexto.lineWidth = 1.5;
                contexto.setLineDash([4, 6]);
                contexto.beginPath();
                
                if (this.tipo === 0) {
                    contexto.arc(0, 0, this.tamano, 0, Math.PI * 2);
                } else if (this.tipo === 1) {
                    contexto.rect(-this.tamano, -this.tamano * 2, this.tamano * 2, this.tamano);
                } else {
                    contexto.moveTo(0, -this.tamano);
                    contexto.lineTo(-this.tamano, this.tamano);
                    contexto.lineTo(this.tamano, this.tamano);
                    contexto.closePath();
                }
                
                contexto.fill();
                contexto.stroke();
                contexto.setLineDash([]);
                contexto.restore();
                contexto.globalAlpha = 1.0;
            }

            actualizar(canvasW: number, canvasH: number, m: Mouse) {
                this.x += this.vX;
                this.y += this.vY;
                this.angulo += this.velocidadRotacion;
                
                const margen = this.tamano * 3;
                if (this.x > canvasW + margen) this.x = -margen;
                else if (this.x < -margen) this.x = canvasW + margen;
                if (this.y > canvasH + margen) this.y = -margen;
                else if (this.y < -margen) this.y = canvasH + margen;

                if (m.x !== null && m.y !== null) {
                    const dx = m.x - this.x;
                    const dy = m.y - this.y;
                    const distancia = Math.sqrt(dx * dx + dy * dy);
                    if (distancia < m.radio) {
                        const fuerza = (m.radio - distancia) / m.radio;
                        this.x += (this.x - m.x) * fuerza * 0.05;
                        this.y += (this.y - m.y) * fuerza * 0.05;
                    }
                }
            }
        }

        const init = (w: number, h: number) => {
            figuras = [];
            const cantidad = (w * h) / 200000; 
            for (let i = 0; i < cantidad; i++) {
                figuras.push(new Figura(w, h));
            }
        };

        const ajustarPantalla = () => {
            width = window.innerWidth;
            height = container.scrollHeight; 
            canvas.width = width;
            canvas.height = height;
            init(width, height);
        };

        const animar = () => {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            
            figuras.forEach(f => {
                f.actualizar(width, height, mouse);
                f.dibujar(ctx);
            });
            animationFrameId = requestAnimationFrame(animar);
        };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY + window.scrollY;
        };
        window.addEventListener('resize', ajustarPantalla);
        window.addEventListener('mousemove', handleMouseMove);
        const resizeObserver = new ResizeObserver(() => ajustarPantalla());
        resizeObserver.observe(container);
        ajustarPantalla();
        animar();
        return () => {
            window.removeEventListener('resize', ajustarPantalla);
            window.removeEventListener('mousemove', handleMouseMove);
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); 

    return (
        <div ref={containerRef} style={{ position: 'relative', minHeight: '100vh' }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    pointerEvents: 'none',
                    display: 'block'
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};

export default BackgroundCanvas;