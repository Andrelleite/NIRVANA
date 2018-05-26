#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "header.h"

void running(lista_pessoas P_Lista, lista_task T_Lista, lista_task To_do, lista_task Doing, lista_task Done){



        upload_info(P_Lista);
        upload_info_task(T_Lista, To_do, Doing, Done, P_Lista);
        printf("\n\n\n\n\n\n\t\t _________________________________\n");
        printf("\t\t|_________________________________|\n\t\t|________PROJETO PPP 2018_________|\n\t\t|_________________________________|\n");
        printf("\t\t|_________________________________|\n\t\t|______KANBAN TASK MANAGEMENT_____|\n\t\t|_________________________________|\n");
        printf("\n\n\t\t\t    Andre Leite\n\n\t\t\t         e\n\n\t\t\t   Ana Goncalves");

        printf("\n\n\n\n\t\t  Pressione Enter para continuar...");
        getchar();

}

void menu(lista_pessoas P_Lista, lista_task T_Lista, lista_task Todo, lista_task Doing, lista_task Done){

        int choice, choice_2;
        Task *temp;
        system("cls");

        printf("       | MAIN MENU |\n\n______ TRABALHADORES ______\n\n[1] Inserir Pessoa\n[2] Visualizar Lista de Trabalhadores\n[3] Informacao do trabalhador\n\n");
        printf("______    TAREFAS    ______\n\n[4] Criar Nova Tarefa\n[5] Visualizar Lista de Tarefas\n\n");
        printf("______ KANBAN STATUS ______\n\n[6] Visualizar todo o quadro\n[7] Tarefas na seccao To Do\n[8] Tarefas na seccao Doing\n[9] Tarefas na seccao Done\n\n");
        printf("______KANBAN LISTS OPS______\n\n[10] Mover tarefa em To Do\n[11] Mover tarefa em Doing\n[12] Mover tarefa em Done\n\n");
        printf("______     OTHERS     ______\n\n[13] Mudar responsavel por tarefa\n[14] Eliminar Tarefa\n[15] Eliminar Trabalhador\n\n\n[0] Exit\n\n");
        printf("\nOpcao [ ] : ");
        scanf("%d", &choice);
        getchar();
        printf("\n");

        /*Fase da tarefa (1,2,3) | 1->Todo | 2->Doing | 3->Done*/

        switch(choice){
                case 1:
                        insere_pessoa(P_Lista);menu(P_Lista, T_Lista,Todo,Doing,Done);break;
                case 2:
                        imprime_lista_pessoas(P_Lista);menu(P_Lista, T_Lista,Todo,Doing,Done);break;
                case 3:
                        worker_info(P_Lista);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 4:
                        temp = cria_tarefa(T_Lista);
                        insere_tarefa(Todo,temp,2);
                        menu(P_Lista, T_Lista,Todo,Doing,Done);
                        break;
                case 5:
                        imprime_lista_tarefas(T_Lista);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 6:
                        system("cls");
                        printf("\n      [TO DO SECTION]\n\n");
                        imprime_lista_tarefas(Todo);
                        printf("\n      [DOING SECTION]\n\n");
                        imprime_lista_tarefas(Doing);
                        printf("\n      [DONE SECTION]\n\n");
                        imprime_lista_tarefas(Done);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 7:
                        system("cls");
                        printf("\n      [TO DO SECTION]\n\n");
                        imprime_lista_tarefas(Todo);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 8:
                        system("cls");
                        printf("\n      [DOING SECTION]\n\n");
                        imprime_lista_tarefas(Doing);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 9:
                        system("cls");
                        printf("\n      [DONE SECTION]\n\n");
                        imprime_lista_tarefas(Done);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 10:

                        system("cls");
                        printf("\n     [TO DO] ");
                        printf("\n\nDestino:\n\n[1] Sector Doing\n\n");
                        printf("\nOpcao [ ] : ");
                        scanf("%d", &choice_2);
                        getchar();
                        printf("\n");
                        switch(choice_2){
                                case 1:
                                        printf("\n     [TO DO] -> [DOING]");
                                        printf("\n  *Atribuicao obrigatoria.*\n");
                                        pass_section(Todo,Doing,P_Lista,1,0,2);  /* flag = 1 refere uma atribuicao | flag = 0 refere uma desvinculação , tipo = 0 TO do | tipo = 1 Doing | tipo = 2 Done*/
                                        break;
                                default:
                                        break;
                        }
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;

                case 11:
                        system("cls");
                        printf("\n     [DOING] ");
                        printf("\n\nDestino:\n\n[1] Sector To do\n[2] Sector Done\n\n");
                        printf("\nOpcao [ ] : ");
                        scanf("%d", &choice_2);
                        getchar();
                        printf("\n");
                        switch(choice_2){
                                case 1:
                                        printf("\n     [DOING] -> [TO DO]");
                                        printf("\n  *Desvincula Trabalhador atual.*\n");
                                        pass_section(Doing,Todo,P_Lista,0,0,1);  /* flag = 1 refere uma atribuicao | flag = 0 refere uma desvinculação */
                                        break;
                                case 2:
                                        printf("\n     [DOING] -> [DONE]");
                                        pass_section(Doing,Done,P_Lista,0,1,3);  /* flag = 1 refere uma atribuicao | flag = 0 refere uma desvinculação */
                                        break;
                                default:
                                        break;
                        }
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 12:
                        system("cls");
                        printf("\n     [DONE] ");
                        printf("\n\nDestino:\n\n[1] Sector To do\n[2] Sector Doing\n\n");
                        printf("\nOpcao [ ] : ");
                        scanf("%d", &choice_2);
                        getchar();
                        printf("\n");
                        switch(choice_2){
                                case 1:
                                        printf("\n     [DONE] -> [TO DO]");
                                        printf("\n  *Atribuicao obrigatoria.*\n");
                                        pass_section(Done,Todo,P_Lista,0,0,1);  /* flag = 1 refere uma atribuicao | flag = 0 refere uma desvinculação */
                                        break;
                                case 2:
                                        printf("\n     [DONE] -> [DOING]");
                                        printf("\n  *Atribuicao obrigatoria.*\n");
                                        pass_section(Done,Doing,P_Lista,0,1,2);  /* flag = 1 refere uma atribuicao | flag = 0 refere uma desvinculação */
                                        break;
                                default:
                                        break;
                        }
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 13:
                        switch_worker(Doing,P_Lista);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 14:
                        eliminate_task(T_Lista,Todo,Done);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 15:
                        eliminate_worker(P_Lista);
                        menu(P_Lista,T_Lista,Todo,Doing,Done);
                        break;
                case 0:
                        put_on_text(P_Lista);
                        put_on_text_task(T_Lista);
                        printf("**Toda a informacao foi guardada em ficheiros **\n");
                        printf("**E possivel que alguma informacao tenha sofrido alteracoes para corrigir erros de input em ficheiros.**\n");
                        break;
                default:
                        menu(P_Lista, T_Lista,Todo,Doing,Done);
        }


}

int main(){

        lista_pessoas P_Lista = cria_lista_pessoas();
        lista_task T_Lista = cria_lista_tarefas();
        lista_task Todo_List = cria_lista_tarefas();
        lista_task Doing_List = cria_lista_tarefas();
        lista_task Done_List = cria_lista_tarefas();

        running(P_Lista,T_Lista, Todo_List, Doing_List, Done_List);

        menu(P_Lista, T_Lista, Todo_List, Doing_List, Done_List);


        return 0;
}
