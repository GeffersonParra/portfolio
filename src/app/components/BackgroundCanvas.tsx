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
        const mouse: Mouse = { x: null, y: null, radio: 200 };
        const coloresLight = ['#4285F4', '#34A853', '#EA4335', '#FBBC05'];
        const backgroundColor = theme === 'dark' ? '#0d0d0d' : '#F8F7F4';
        const ajustarPantalla = () => {
            canvas.width = window.innerWidth;
            canvas.height = container.scrollHeight; 
            figuras = [];
            init();
        };
        class Figura {
            x: number; y: number; tamano: number; tipo: number;
            vX: number; vY: number; opacidad: number; angulo: number;
            velocidadRotacion: number; colorBase: string;
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
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

            dibujar(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angulo);    
                if (theme === 'dark') {
                    ctx.fillStyle = `rgba(${this.colorBase}, ${this.opacidad})`;
                    ctx.strokeStyle = `rgba(${this.colorBase}, ${this.opacidad})`;
                } else {
                    ctx.globalAlpha = this.opacidad;
                    ctx.fillStyle = this.colorBase;
                    ctx.strokeStyle = this.colorBase;
                }
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 6]);
                ctx.beginPath();
                if (this.tipo === 0) ctx.arc(0, 0, this.tamano, 0, Math.PI * 2);
                else if (this.tipo === 1) ctx.rect(-this.tamano, -this.tamano * 2, this.tamano * 2, this.tamano);
                else {
                    ctx.moveTo(0, -this.tamano);
                    ctx.lineTo(-this.tamano, this.tamano);
                    ctx.lineTo(this.tamano, this.tamano);
                    ctx.closePath();
                }
                ctx.fill();
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
                ctx.globalAlpha = 1.0;
            }
            actualizar(canvasWidth: number, canvasHeight: number, mouse: Mouse) {
                this.x += this.vX;
                this.y += this.vY;
                this.angulo += this.velocidadRotacion;
                const margen = this.tamano * 3;
                if (this.x > canvasWidth + margen) this.x = -margen;
                else if (this.x < -margen) this.x = canvasWidth + margen;
                if (this.y > canvasHeight + margen) this.y = -margen;
                else if (this.y < -margen) this.y = canvasHeight + margen;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distancia = Math.sqrt(dx * dx + dy * dy);
                    if (distancia < mouse.radio) {
                        const fuerza = (mouse.radio - distancia) / mouse.radio;
                        this.x += (this.x - mouse.x) * fuerza * 0.05;
                        this.y += (this.y - mouse.y) * fuerza * 0.05;
                    }
                }
            }
        }
        function init() {
            const cantidad = (canvas.width * canvas.height) / 200000; 
            for (let i = 0; i < cantidad; i++) {
                figuras.push(new Figura());
            }
        }

        let animationFrameId: number;
        function animar() {
            ctx!.fillStyle = backgroundColor;
            ctx!.fillRect(0, 0, canvas.width, canvas.height);
            figuras.forEach(f => {
                f.actualizar(canvas.width, canvas.height, mouse);
                f.dibujar(ctx!);
            });
            animationFrameId = requestAnimationFrame(animar);
        }
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