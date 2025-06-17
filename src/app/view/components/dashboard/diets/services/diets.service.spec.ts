import { TestBed } from '@angular/core/testing';

import { DietsService } from './diets.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';

describe('DietsService', () => {
    let service: DietsService;
    let httpController: HttpTestingController;
    let diet: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DietsService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(DietsService);
        httpController = TestBed.inject(HttpTestingController);

        diet = {
            id: 81,
            user_id: 9,
            bmi_status_id: 3,
            description:
                'Segunda: Café da Manhã: Prato: Omelete com espinafre e tomate; Ingredientes: 2 ovos, 50g de espinafre, 1 tomate; Almoço: Prato: Peito de frango grelhado com arroz integral e brócolis; Ingredientes: 100g de peito de frango, 50g de arroz integral, 100g de brócolis; Café da Tarde: Prato: Frutas picadas com granola sem açúcar; Ingredientes: 1 xícara de frutas picadas (morango, kiwi, abacaxi), 30g de granola sem açúcar; Jantar: Prato: Sopa de abóbora com gengibre; Ingredientes: 300g de abóbora, 1 colher de chá de gengibre ralado. Terça: Café da Manhã: Prato: Mingau de aveia com banana e chia; Ingredientes: 30g de aveia, 1 banana, 1 colher de sopa de sementes de chia; Almoço: Prato: Tilápia grelhada com batata-doce e salada; Ingredientes: 100g de tilápia, 100g de batata-doce, salada de folhas verdes a gosto; Café da Tarde: Prato: Pão integral com homus e cenoura ralada; Ingredientes: 1 fatia de pão integral, 2 colheres de sopa de homus, 1 cenoura ralada; Jantar: Prato: Omelete de legumes com arroz integral; Ingredientes: 2 ovos, legumes variados picados a gosto, 50g de arroz integral. Quarta: Café da Manhã: Prato: Pão de queijo fit com batata-doce; Ingredientes: 2 unidades de pão de queijo fit, 100g de batata-doce cozida; Almoço: Prato: Quinoa com frango desfiado e legumes; Ingredientes: 50g de quinoa, 100g de frango desfiado, legumes salteados a gosto; Café da Tarde: Prato: Mix de castanhas com frutas secas; Ingredientes: 30g de castanhas variadas, 30g de frutas secas; Jantar: Prato: Legumes assados no forno com frango desfiado; Ingredientes: legumes variados, 100g de frango desfiado. Quinta: Café da Manhã: Prato: Tapioca com pasta de grão-de-bico (homus); Ingredientes: 50g de tapioca, 2 colheres de sopa de pasta de grão-de-bico; Almoço: Prato: Estrogonofe de frango leve com arroz e salada; Ingredientes: 100g de frango em tiras, 50g de arroz integral, salada de folhas verdes a gosto; Café da Tarde: Prato: Bolo de banana com aveia (vegano); Ingredientes: 1 fatia de bolo de banana com aveia; Jantar: Prato: Sopa de lentilha com legumes; Ingredientes: 50g de lentilhas, legumes variados, temperos a gosto. Sexta: Café da Manhã: Prato: Pão integral com pasta de amendoim e banana; Ingredientes: 1 fatia de pão integral, 1 colher de sopa de pasta de amendoim, 1 banana; Almoço: Prato: Frango desfiado com purê de mandioquinha e couve refogada; Ingredientes: 100g de frango desfiado, 100g de mandioquinha, couve refogada a gosto; Café da Tarde: Prato: Torrada integral com guacamole; Ingredientes: 1 fatia de torrada integral, guacamole a gosto; Jantar: Prato: Arroz integral com tofu grelhado e couve refogada; Ingredientes: 50g de arroz integral, 100g de tofu grelhado, couve refogada a gosto. Sábado: Café da Manhã: Prato: Panqueca de banana e aveia; Ingredientes: 2 unidades de panqueca de banana e aveia; Almoço: Prato: Arroz com lentilha e legumes salteados; Ingredientes: 50g de arroz, 50g de lentilhas, legumes salteados a gosto; Café da Tarde: Prato: Chips de batata-doce com pasta de grão-de-bico; Ingredientes: 50g de chips de batata-doce, 2 colheres de sopa de pasta de grão-de-bico; Jantar: Prato: Panqueca de aveia com recheio de legumes; Ingredientes: 2 unidades de panqueca de aveia, recheio de legumes a gosto. Domingo: Café da Manhã: Prato: Smoothie de frutas com linhaça; Ingredientes: frutas variadas, linhaça a gosto; Almoço: Prato: Abobrinha recheada com arroz e legumes; Ingredientes: abobrinha, arroz integral, legumes a gosto; Café da Tarde: Prato: Iogurte vegetal com chia; Ingredientes: 1 pote de iogurte vegetal, 1 colher de sopa de chia; Jantar: Prato: Tabule com grão-de-bico e hortelã; Ingredientes: 50g de tabule, grão-de-bico a gosto, hortelã a gosto.',
            parsed_description: [
                {
                    day: 'Segunda',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Omelete com espinafre e tomate',
                            ingredients: '2 ovos, 50g de espinafre, 1 tomate;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Peito de frango grelhado com arroz integral e brócolis',
                            ingredients:
                                '100g de peito de frango, 50g de arroz integral, 100g de brócolis;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Frutas picadas com granola sem açúcar',
                            ingredients:
                                '1 xícara de frutas picadas (morango, kiwi, abacaxi), 30g de granola sem açúcar;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Sopa de abóbora com gengibre',
                            ingredients:
                                '300g de abóbora, 1 colher de chá de gengibre ralado.',
                        },
                    ],
                },
                {
                    day: 'Terça',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Mingau de aveia com banana e chia',
                            ingredients:
                                '30g de aveia, 1 banana, 1 colher de sopa de sementes de chia;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Tilápia grelhada com batata-doce e salada',
                            ingredients:
                                '100g de tilápia, 100g de batata-doce, salada de folhas verdes a gosto;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Pão integral com homus e cenoura ralada',
                            ingredients:
                                '1 fatia de pão integral, 2 colheres de sopa de homus, 1 cenoura ralada;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Omelete de legumes com arroz integral',
                            ingredients:
                                '2 ovos, legumes variados picados a gosto, 50g de arroz integral.',
                        },
                    ],
                },
                {
                    day: 'Quarta',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Pão de queijo fit com batata-doce',
                            ingredients:
                                '2 unidades de pão de queijo fit, 100g de batata-doce cozida;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Quinoa com frango desfiado e legumes',
                            ingredients:
                                '50g de quinoa, 100g de frango desfiado, legumes salteados a gosto;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Mix de castanhas com frutas secas',
                            ingredients:
                                '30g de castanhas variadas, 30g de frutas secas;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Legumes assados no forno com frango desfiado',
                            ingredients:
                                'legumes variados, 100g de frango desfiado.',
                        },
                    ],
                },
                {
                    day: 'Quinta',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Tapioca com pasta de grão-de-bico (homus)',
                            ingredients:
                                '50g de tapioca, 2 colheres de sopa de pasta de grão-de-bico;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Estrogonofe de frango leve com arroz e salada',
                            ingredients:
                                '100g de frango em tiras, 50g de arroz integral, salada de folhas verdes a gosto;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Bolo de banana com aveia (vegano)',
                            ingredients: '1 fatia de bolo de banana com aveia;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Sopa de lentilha com legumes',
                            ingredients:
                                '50g de lentilhas, legumes variados, temperos a gosto.',
                        },
                    ],
                },
                {
                    day: 'Sexta',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Pão integral com pasta de amendoim e banana',
                            ingredients:
                                '1 fatia de pão integral, 1 colher de sopa de pasta de amendoim, 1 banana;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Frango desfiado com purê de mandioquinha e couve refogada',
                            ingredients:
                                '100g de frango desfiado, 100g de mandioquinha, couve refogada a gosto;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Torrada integral com guacamole',
                            ingredients:
                                '1 fatia de torrada integral, guacamole a gosto;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Arroz integral com tofu grelhado e couve refogada',
                            ingredients:
                                '50g de arroz integral, 100g de tofu grelhado, couve refogada a gosto.',
                        },
                    ],
                },
                {
                    day: 'Sábado',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Panqueca de banana e aveia',
                            ingredients:
                                '2 unidades de panqueca de banana e aveia;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Arroz com lentilha e legumes salteados',
                            ingredients:
                                '50g de arroz, 50g de lentilhas, legumes salteados a gosto;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Chips de batata-doce com pasta de grão-de-bico',
                            ingredients:
                                '50g de chips de batata-doce, 2 colheres de sopa de pasta de grão-de-bico;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Panqueca de aveia com recheio de legumes',
                            ingredients:
                                '2 unidades de panqueca de aveia, recheio de legumes a gosto.',
                        },
                    ],
                },
                {
                    day: 'Domingo',
                    meals: [
                        {
                            meal: 'Café da Manhã',
                            dish: 'Smoothie de frutas com linhaça',
                            ingredients: 'frutas variadas, linhaça a gosto;',
                        },
                        {
                            meal: 'Almoço',
                            dish: 'Abobrinha recheada com arroz e legumes',
                            ingredients:
                                'abobrinha, arroz integral, legumes a gosto;',
                        },
                        {
                            meal: 'Café da Tarde',
                            dish: 'Iogurte vegetal com chia',
                            ingredients:
                                '1 pote de iogurte vegetal, 1 colher de sopa de chia;',
                        },
                        {
                            meal: 'Jantar',
                            dish: 'Tabule com grão-de-bico e hortelã',
                            ingredients:
                                '50g de tabule, grão-de-bico a gosto, hortelã a gosto.',
                        },
                    ],
                },
            ],
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create diet with intolerances', () => {
        let intolerances = ['leite'];

        service.create(intolerances).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(diet);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/diets/create`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ intolerances: intolerances });
        req.flush(diet);
    });

    it('should create diet without intolerances', () => {
        service.create([]).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(diet);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/diets/create`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ intolerances: [] });
        req.flush(diet);
    });

    it('should show error message when user has not a assessment', () => {
        let errorMessage = {
            detail: 'Não foi possível encontrar seu IMC. Cadastre suas informações primeiro.',
        };

        service.create([]).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/diets/create`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ intolerances: [] });
        req.flush(errorMessage);
    });

    it('should get last diet using user id', () => {
        service.loadById().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(diet);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/diets/by-id`
        );
        expect(req.request.method).toBe('GET');
        req.flush(diet);
    });

    it('should show error message when get last diet using user id and user has not a assessment', () => {
        let errorMessage = {
            detail: 'Não foi possível encontrar seu IMC. Cadastre suas informações primeiro.',
        };
        service.loadById().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/diets/by-id`
        );
        expect(req.request.method).toBe('GET');
        req.flush(errorMessage);
    });
});
