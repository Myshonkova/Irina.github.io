const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const balls = [];

        class Ball {
            constructor(x, y, radius, dx, dy, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.dx = dx;
                this.dy = dy;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }
        function createBalls() {
            balls.length = 0; 
            for (let i = 0; i < 50; i++) {
                const radius = Math.random() * 20 + 10;
                const x = Math.random() * (canvas.width - radius * 2) + radius;
                const y = Math.random() * (canvas.height - radius * 2) + radius;
                const dx = (Math.random() - 0.5) * 5;
                const dy = (Math.random() - 0.5) * 5;
                const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
                balls.push(new Ball(x, y, radius, dx, dy, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const ball of balls) {
                ball.update();
            }
        }

        startButton.addEventListener('click', () => {
            createBalls();
            animate();
            startButton.style.display = 'none'; 
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });