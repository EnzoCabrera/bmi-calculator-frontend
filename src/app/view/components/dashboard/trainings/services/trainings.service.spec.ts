import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TrainingsService } from './trainings.service';
import { environment } from 'src/environments/environment.prod';

describe('TrainingsService', () => {
    let service: TrainingsService;
    let httpController: HttpTestingController;
    let training: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrainingsService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(TrainingsService);
        httpController = TestBed.inject(HttpTestingController);

        training = {
            id: 45,
            user_id: 9,
            bmi_status_id: 3,
            description:
                'Segunda: Supino Reto: 4x15; Crossover no Cabo: 3x12; Supino Declinado: 4x15; Pullover com Halteres: 3x12; Flexão de Braço: 4x20; Terça: Puxada na Frente: 4x15; Remada Curvada com Barra: 3x12; Barra Fixa: 4x10; Puxada na Frente com Pegada Fechada: 3x15; Levantamento Terra: 4x12; Quarta: Agachamento Livre: 4x15; Avanço com Halteres: 3x12; Stiff com Halteres: 4x15; Leg Press 45°: 3x12; Agachamento Sumô com Halteres: 4x15; Quinta: Desenvolvimento com Halteres: 4x15; Elevação Lateral: 3x12; Arnold Press: 4x15; Encolhimento com Halteres: 3x12; Elevação Lateral com Halteres Sentado: 4x15; Sexta: Rosca Direta com Barra: 4x15; Tríceps Banco: 3x12; Rosca Concentrada: 4x15; Tríceps Pulley: 3x12; Rosca Martelo: 4x15.',
            parsed_description: [
                {
                    day: 'Segunda',
                    exercises: [
                        {
                            exercicio: 'Supino Reto',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Crossover no Cabo',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Supino Declinado',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Pullover com Halteres',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Flexão de Braço',
                            repeticoes: '4x20',
                        },
                    ],
                },
                {
                    day: 'Terça',
                    exercises: [
                        {
                            exercicio: 'Puxada na Frente',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Remada Curvada com Barra',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Barra Fixa',
                            repeticoes: '4x10',
                        },
                        {
                            exercicio: 'Puxada na Frente com Pegada Fechada',
                            repeticoes: '3x15',
                        },
                        {
                            exercicio: 'Levantamento Terra',
                            repeticoes: '4x12',
                        },
                    ],
                },
                {
                    day: 'Quarta',
                    exercises: [
                        {
                            exercicio: 'Agachamento Livre',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Avanço com Halteres',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Stiff com Halteres',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Leg Press 45°',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Agachamento Sumô com Halteres',
                            repeticoes: '4x15',
                        },
                    ],
                },
                {
                    day: 'Quinta',
                    exercises: [
                        {
                            exercicio: 'Desenvolvimento com Halteres',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Elevação Lateral',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Arnold Press',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Encolhimento com Halteres',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Elevação Lateral com Halteres Sentado',
                            repeticoes: '4x15',
                        },
                    ],
                },
                {
                    day: 'Sexta',
                    exercises: [
                        {
                            exercicio: 'Rosca Direta com Barra',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Tríceps Banco',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Rosca Concentrada',
                            repeticoes: '4x15',
                        },
                        {
                            exercicio: 'Tríceps Pulley',
                            repeticoes: '3x12',
                        },
                        {
                            exercicio: 'Rosca Martelo',
                            repeticoes: '4x15.',
                        },
                    ],
                },
            ],
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create training', () => {
        service.create().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(training);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/trainings/create`
        );
        expect(req.request.method).toBe('POST');
        req.flush(training);
    });

    it('should show error message when user has not a assessment', () => {
        let errorMessage = {
            detail: 'Não foi possível encontrar seu IMC. Cadastre suas informações primeiro.',
        };

        service.create().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/trainings/create`
        );
        expect(req.request.method).toBe('POST');
        req.flush(errorMessage);
    });

    it('should get last training using user id', () => {
        service.loadById().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(training);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/trainings/by-id`
        );
        expect(req.request.method).toBe('GET');
        req.flush(training);
    })

    it('should show error message when get last training using user id and user has not a assessment', () => {
        let errorMessage = {
            detail: 'Não foi possível encontrar seu IMC. Cadastre suas informações primeiro.',
        };
        service.loadById().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/trainings/by-id`
        );
        expect(req.request.method).toBe('GET');
        req.flush(errorMessage);
    })
});
