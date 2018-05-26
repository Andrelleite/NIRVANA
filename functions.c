#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "header.h"


/**

        **Ler README.txt**

        Todas as funções têm um papel fulcral, sendo que existem algumas que se tornam preponderantes na implementação deste código, uma vez que são utilizadas constantemente
        e até mesmo chamadas pelas outras funções, de modo a tornar o código mais eficiente, mais versátil e mais leve. É importante manter um código bem estruturado para que a sua
        manutenção seja fácil

        GitHub -> https://github.com//Andrelleite

        Number of functions : 29
        voids : 16
        Task* : 1
        Pessoa* : 1
        Data* :  2
        int: 7
        lista_task: 1
        lista_pessoas: 1

**/


/*******************************************************************
*
*                                               APLICATION OPERATIONS SECTION
*
********************************************************************/


lista_task cria_lista_tarefas(){ /* Função para inicializar a lista de tarefas*/

        lista_task novo = (lista_task) malloc(sizeof(Node));
        if(novo != NULL){

                novo->n = 0;
                novo->next = NULL;
                novo->tarefa = NULL;

        }else{
                printf("ERRO NA ALOCACAO DE MEMORIA\n\n");

        }

        return novo;

}

lista_pessoas cria_lista_pessoas(){ /* Função para inicializar uma lista de pessoas */

        lista_pessoas novo = (lista_pessoas)malloc(sizeof(P_Node));
        if(novo != NULL){
                novo->n = 0 ;
                novo->next = NULL;
                novo->p = NULL;
        }else{
                printf("ERRO NA ALOCACAO DE MEMORIA\n\n");

        }

        return novo;

}

void insere_pessoa(lista_pessoas lista){ /* Inserção de uma pessoa numa lista ligada */

        Pessoa *nova = cria_pessoa(lista);
        lista_pessoas no = (lista_pessoas)malloc(sizeof(P_Node));
        lista_pessoas ante = lista;
        lista_pessoas then = ante->next;

        no->p = nova;
        no->n = 0;

        if(lista->next == NULL){

                lista->n++;
                no->next = lista->next;
                lista->next = no;

        }else{

                while(nova->id > then->p->id && then->next != NULL){
                        ante = then;
                        then = then->next;
                }

                if( nova->id < then->p->id ){
                        ante->next = no;
                        no->next = then;
                }
                else{
                        no->next = then->next;
                        then->next = no;
                }

        }

}

Pessoa *cria_pessoa(lista_pessoas lista){ /* Criar uma pessoa/trabalhador em memória */

        int i;
        int check = 0;
        lista_pessoas prox;
        Pessoa *novo = (Pessoa *)malloc(sizeof(Pessoa));
        novo->nome = (char *)malloc(15 * sizeof(char));
        novo->mail = (char *)malloc(30 * sizeof(char));

        system("cls");
        printf("\n\n\tCriacao de Trabalhador\n\n");
        printf("Nome: ");
        fgets(novo->nome, 15,stdin);
        printf("Idade: ");
        scanf("%d", &novo->idade);
        getchar();
        printf("E-Mail: ");
        fgets(novo->mail, 30, stdin);

        i = 1;
        prox = lista->next;
        while(prox != NULL && check == 0){
                if(i == prox->p->id){
                        i++;
                }else{
                        check = 1;
                }
                prox = prox->next;
        }
        novo->id = i;

        printf("ID: %d\n",novo->id);
        if(lista->next == NULL){
                printf("Numero de tarefas maxima: ");
                scanf("%d",&novo->max_task);
                getchar();

                while(novo->max_task <= 0){
                        printf("\nAdicione um limite acima de 0.\n");
                        printf("Numero de tarefas maxima: ");
                        scanf("%d",&novo->max_task);
                        getchar();

                }

        }else{
                novo->max_task = lista->next->p->max_task;
                printf("\nAtribuindo numero maximo de tarefas global (%d).\n",novo->max_task);
        }


        novo->mytasks = cria_lista_tarefas();

        printf("Pressione Enter para continuar... ");
        getchar();

        return novo;
}

void imprime_lista_pessoas(lista_pessoas lista){ /* Fazer display de uma lista de pessoas/trabalhadores em consola */

        Pessoa *pessoa;
        lista_pessoas act = lista->next;

        printf("____Lista de Trabalhadores____\n\n");
        printf("    N de trabalhadores: %d\n\n",lista->n);

        if(lista->next == NULL){
                printf("    (Sem trabalhadores)\n\n");
        }else{

                printf("__________________________________________________\n\n");
                while(act != NULL){
                        pessoa = act->p;
                        printf("Nome: %s | Idade: %d | E-Mail: %s\n | Max Tasks: %d \n | Tarefas adquiridas: %d \n | ID: %d\n__________________________________________________\n\n",pessoa->nome,pessoa->idade,pessoa->mail, pessoa->max_task,pessoa->mytasks->n,pessoa->id);
                        act = act->next;
                }

        }

        printf("Pressione Enter para continuar... ");
        getchar();

}

int get_worker(lista_pessoas lista,lista_pessoas *ant, lista_pessoas *act, int id){ /* obter um trabalhador pelo seu ID */

        int found  = 0;
        *act = lista->next;
        *ant = lista;
        if(lista->next == NULL){
                printf("    (Sem trabalhadores)\n\n");
        }else if(id > 0){

                while(*act != NULL && found == 0){

                        if( (*act)->p->id == id ){
                                found = 1;
                        }else{
                                (*ant) = (*act);
                                (*act) = (*act)->next;
                        }
                }
        }else{
                found = 0;
        }

        return found;

}

int get_task(lista_task lista,lista_task *ant ,lista_task *act, int id){ /* obter uma tarefa pelo seu ID */

        int found  = 0;
        *act = lista->next;
        *ant = lista;

        if(lista->next == NULL){
                printf("(Sem tarefas)\n\n");
        }
        else if(id >= 0 ){

                while(*act != NULL && found == 0){

                        if( (*act)->tarefa->id == id ){
                                found = 1;
                        }else{
                                (*ant) = (*act);
                                (*act) = (*act)->next;
                        }
                }

        }
        else{

                found = 0;

        }

        return found;



}

void worker_info(lista_pessoas lista){ /* Obter informação de um trabalhador */

        lista_pessoas work;
        lista_pessoas ant;
        Pessoa *p;
        int id;
        int choice;
        int got;
        system("cls");

        printf("\n\n\tInformacao de Trabalhador\n\n");

        printf(" ID: ");
        scanf("%d",&id);
        getchar();

        got = get_worker(lista,&ant,&work,id);

        if(got){
                p = work->p;
                printf("__________________________________________________\n\n");
                printf("Nome: %s | Idade: %d | E-Mail: %s | ID: %d\n__________________________________________________\n\n",p->nome,p->idade,p->mail, p->id);

                printf("Ver lista de tarefas deste trabalhador? [ 1 - sim / 0 - nao]\n-> ");
                scanf("%d",&choice);
                getchar();
                if(choice){
                        printf("\n      Worker %s\n\t ID: %d \n",p->nome,p->id);
                        imprime_lista_tarefas(p->mytasks);
                }

        }else if(got == 0){
                printf("ID errado. Tente novamente.\n\n");
        }

        printf("Pressione qualquer tecla para continuar... ");
        getchar();
}

Task *cria_tarefa(lista_task lista){ /* Criar uma tarefa em memória */

        Task *nova = (Task *)malloc(sizeof(Task));
        int comp;
        int i;
        int check = 0;
        lista_task prox;
        lista_task temp = cria_lista_tarefas();

        system("cls");

        printf("\n\n\tCriacao de Tarefa\n\n");


        printf("Prioridade (1-10) : ");
        scanf("%d",&nova->priority);
        getchar();

        while(nova->priority < 1 || nova->priority > 10){
                printf("\nPrioridade Invalidade. Tente um valor de  1 a 10.\n");
                printf("\nPrioridade (1-10) : ");
                scanf("%d",&nova->priority);
                getchar();
        }

        printf("Descricao: ");
        nova->descricao = (char *)malloc(30*sizeof(char));
        fgets(nova->descricao,30,stdin );

        printf("Data de Criacao ");
        nova->inicio = set_data();

        while(check_date_erros(nova->inicio)){
                printf("Data de criacao ");
                nova->inicio = set_data();
        }


        printf("Prazo final ");
        nova->prazo = set_data();

        while(check_date_erros(nova->prazo)){
                printf("Prazo final ");
                nova->prazo = set_data();

        }


        comp = compare_date(nova->inicio,nova->prazo);

        while(comp == 1 || comp == 0){
                printf("\nPrazo definido nao excede a data de criacao. Insira novamente.\n\n");
                printf("Prazo final ");
                nova->prazo = set_data();
                comp = compare_date(nova->inicio,nova->prazo);

        }

        prox = lista->next;
        while(prox != NULL){
                insere_tarefa(temp,prox->tarefa,4);
                prox = prox->next;
        }
        prox = temp->next;

        i = 1;
        prox = temp->next;
        while(prox != NULL && check == 0){
                if(i == prox->tarefa->id){
                        i++;
                }else{
                        check = 1;
                }
                prox = prox->next;
        }
        nova->id = i;
        free(temp);


        nova->fim = NULL;
        nova->worker = NULL;
        nova->personId= 0;
        nova->fase = 1;
        printf("ID: %d\n", nova->id);

        printf("Pressione Enter para continuar... ");
        getchar();

        insere_tarefa(lista,nova,0);

        return nova;
}

void insere_tarefa(lista_task lista, Task *nova, int flag){ /* Inserir uma tarefa numa lista ligada */

        lista_task then = lista->next;
        lista_task ante = lista;

        lista_task no = (lista_task)malloc(sizeof(Node));

        no->tarefa = nova;
        no->n = 0;
        lista->n++;

        if(nova != NULL && then == NULL){

                no->next = then;
                ante->next = no;
        }

        else if(nova != NULL && then != NULL){

                if(flag == 0){ /* Ordenamento por ordem crescente de data de criação*/

                        while(compare_date(nova->inicio,then->tarefa->inicio) == 1 && then->next != NULL){

                                ante = then;
                                then = then->next;
                        }

                      if(compare_date(nova->inicio , then->tarefa->inicio) != 1 ){

                                ante->next = no;
                                no->next = then;

                      }
                      else if (compare_date(nova->inicio, then->tarefa->inicio)){

                                no->next = then->next;
                                then->next = no;

                      }

                }
                else if(flag == 1){ /* Ordenamento crescente por data de conclusao*/

                        while(compare_date(nova->fim,then->tarefa->fim) == 1 && then->next != NULL){

                                ante = then;
                                then = then->next;
                        }

                      if(compare_date(nova->fim , then->tarefa->fim) != 1 ){

                                ante->next = no;
                                no->next = then;

                      }
                      else if (compare_date(nova->fim, then->tarefa->fim)){

                                no->next = then->next;
                                then->next = no;

                      }


                }
                else if(flag == 2){ /* Ordenamento decescente por prioridade */

                        while(nova->priority < then->tarefa->priority && then->next != NULL){

                                ante = then;
                                then = then->next;
                        }

                      if(nova->priority > then->tarefa->priority ){

                                ante->next = no;
                                no->next = then;

                      }
                      else if (nova->priority < then->tarefa->priority){

                                no->next = then->next;
                                then->next = no;

                      }
                      else if (nova->priority == then->tarefa->priority){ /*Ordenamento crescente de data de criacao para prioridades iguais */


                                while( compare_date(nova->inicio , then->tarefa->inicio) == 1 && (nova->priority == then->tarefa->priority) && (then->next != NULL )){
                                        ante = then;
                                        then = then->next;

                                }

                                if(compare_date(nova->inicio,then->tarefa->inicio) == 1){
                                        no->next = then->next;
                                        then->next = no;
                                }
                                else if(compare_date(nova->inicio , then->tarefa->inicio) != 1 ){

                                        ante->next = no;
                                        no->next = then;

                                }
                      }

                }
                else if(flag == 3){ /* Ordenamento por ordem alfabetica */

                        while((strcmp(nova->worker->nome, then->tarefa->worker->nome)) > 0 && then->next != NULL){

                                ante = then;
                                then = then->next;
                        }

                      if( (strcmp(nova->worker->nome, then->tarefa->worker->nome)) < 0 ){

                                ante->next = no;
                                no->next = then;

                      }
                      else{

                                no->next = then->next;
                                then->next = no;

                      }

                }
                else if(flag == 4){ /* Ordenamento por ordem id */

                        while(nova->id > then->tarefa->id && then->next != NULL){

                                ante = then;
                                then = then->next;
                        }

                      if( nova->id < then->tarefa->id ){

                                ante->next = no;
                                no->next = then;

                      }
                      else{

                                no->next = then->next;
                                then->next = no;

                      }

                }
                else if(flag == 5){ /* Ordenamento por ordem fase */

                        while(nova->fase > then->tarefa->fase && then->next != NULL){

                                ante = then;
                                then = then->next;
                        }

                      if( nova->fase < then->tarefa->fase ){

                                ante->next = no;
                                no->next = then;

                      }
                      else{

                                no->next = then->next;
                                then->next = no;

                      }

                }

        }

}

void imprime_lista_tarefas(lista_task lista){ /* Fazer diplay de TODAS as tarefas existentes em consola, já devidamente ordenadas*/

        lista_task act = lista->next;
        Task *tarefa;

        printf("_____Lista de Tarefas_____\n\n");
        printf("    Numero de tarefas: %d\n\n",lista->n);

        if(lista->next == NULL){
                printf("      (Sem tarefas)\n\n");
        }else{

                printf("__________________________________________________\n\n");
                while(act != NULL){
                        tarefa = act->tarefa;
                        printf("Fase em Kankan: %d\n",tarefa->fase);
                        printf("Descricao: %s\n",tarefa->descricao);
                        printf("Prioridade: %d\n",tarefa->priority);
                        printf("ID tarefa: %d\n",tarefa->id);

                        printf(" | Data de inicio: %d/%d/%d\n",tarefa->inicio->dia,tarefa->inicio->mes,tarefa->inicio->ano);

                        if(tarefa->prazo  == NULL){
                                printf(" | Prazo Final: (Sem prazo definido)\n");
                        }else{
                                printf(" | Prazo Final: %d/%d/%d\n",tarefa->prazo->dia,tarefa->prazo->mes,tarefa->prazo->ano);
                        }

                        if(tarefa->fim  == NULL){
                                printf(" | Data de fim: (tarefa em progresso)\n");
                        }else{
                                printf(" | Data de fim: %d/%d/%d\n",tarefa->fim->dia,tarefa->fim->mes,tarefa->fim->ano);
                        }

                        if(tarefa->personId == 0 ){
                                printf("Id de trabalhado: (nao atribuido) \n");
                        }else{
                                printf("Id de trabalhado: %d \n",tarefa->personId);
                        }

                       if(tarefa->worker == NULL){
                                printf("Trabalhador encarregue: (ainda sem trabalhador)\n");
                        }else{
                                printf("Trabalhador encarregue: %s\n",tarefa->worker->nome);
                        }
                        printf("__________________________________________________\n\n");
                        act = act->next;
                }

        }

        printf("Pressione Enter para continuar... ");
        getchar();


}

Data *set_data(){ /* Criar uma data */

        Data *nova = (Data *)malloc(sizeof(Data));

        printf("(dd/mm/aaaa) : ");
        scanf("%d/%d/%d",&nova->dia,&nova->mes,&nova->ano);
        getchar();

        return nova;

}

int atribui_tarefa(lista_pessoas lista_p, lista_task lista_t, int *idp){ /*atribuir uma tarefa a um dado trabalhador */

        lista_pessoas act;
        lista_pessoas ante;
        lista_task task;
        lista_task ant;
        int id;
        int got;
        int choice;
        int passed = 0;
        int week_check;

        printf("_____Atribuicao de tarefas_____\n\n");

        printf("Vizualizar trabalhadores disponiveis? [ 1 - sim / 0 - nao ]\n->");
        scanf("%d",&choice);
        printf("\n");

        if(choice){
                imprime_lista_pessoas(lista_p);
                printf("\n");
        }

        printf("\nID do trabalhador: ");
        scanf("%d",&id);
        getchar();
        printf("\n");

        got = get_worker(lista_p,&ante,&act,id);

        if(got){

                printf("Vizualizar Tarefas disponiveis? [ 1 - sim / 0 - nao ]\n->");
                scanf("%d",&choice);
                printf("\n");

                if(choice){
                        imprime_lista_tarefas(lista_t);
                        printf("\n");
                }

                printf("\nID da tarefa: ");
                scanf("%d",&id);
                getchar();
                printf("\n");

                *idp = id;
                got = get_task(lista_t,&ant,&task, id);

                if(got && act->p->mytasks->n < act->p->max_task){
                        week_check = weekly_gap(act->p->mytasks,task->tarefa->prazo);
                        if(task->tarefa->worker == NULL && week_check != 1){
                                insere_tarefa(act->p->mytasks,task->tarefa,5);
                                task->tarefa->worker = act->p;
                                task->tarefa->personId=act->p->id;
                                passed = 1;
                        }else if(week_check == 1){
                                printf("Este trabalhador ja tem tarefas para esta semana.\n\n");
                        }
                        else if(task->tarefa->worker->id == act->p->id){
                                printf("Esta tarefa ja esta atribuida\n\n");
                        }
                        else if(task->tarefa->worker->id != act->p->id){
                                printf("Esta tarefa ja esta atribuida\n\n");
                        }

                }else if( act->p->mytasks->n > act->p->max_task){
                        printf("\nNumero de tarefas maximo atingido. Tarefa nao associada.\n\n");
                }else{
                        printf("ID errado. Tente novamente.\n\n");
                }

        }else{
                printf("ID errado. Tente novamente.\n\n");
        }

        printf("Pressione Enter para continuar... ");
        getchar();

        return passed;

}

void desassocia_tarefa(Task *task){ /* Função principal para desassociar uma tarefa de a um dado trabalhador */

        int found;
        lista_task ante, pos;
        system("cls");

        printf("\n______Desassociar Tarefa______\n\n");

        found = get_task(task->worker->mytasks,&ante,&pos,task->id);

        if(found){
                elimina_no_task(task->worker->mytasks,ante,pos);
                task->worker = NULL;
                task->personId = 0;
                printf("\nTarefa desassociada com sucesso.\n\n");
        }else{

                printf("\nID errado. Tente novamente.\n\n");

        }


        printf("Pressione Enter para continuar... ");
        getchar();

}

void pass_section(lista_task from, lista_task to, lista_pessoas lista_p, int flag, int tipo, int fase){ /*Passagem de tarefas para sectores de KANBAN */

        int id, found, comp, comp2;
        int trys = 0;
        int *idp = (int *)malloc(sizeof(int));

        int passed = 0;
        lista_task ante, pos;
        lista_task bef,then;

        printf("\n_____Passagem de Sector_____\n\n");

        if(from->next == NULL){
                printf("\nEsta seccao nao tem tarefas disponiveis para passagem\n\n");
        }

        else{

                if(flag == 1){

                       passed = atribui_tarefa(lista_p, from, idp);

                        if(passed){

                                printf("\nProcessando tarefa com ID: %d\n\n",*idp);

                                id = *idp;
                                found = get_task(from,&ante,&pos,id);

                                if(found){

                                        printf("\nAlterar Prazo final ? [ 1 - sim / 0 - nao]\n-> ");
                                        scanf("%d",&passed);

                                        if(passed){ /* alterar prazo final */

                                                printf("\nNovo prazo final ");

                                                pos->tarefa->prazo = set_data();

                                                while( check_date_erros(pos->tarefa->prazo)){
                                                        printf("Prazo final ");
                                                        pos->tarefa->prazo = set_data();
                                                }

                                                comp = compare_date(pos->tarefa->inicio,pos->tarefa->prazo);  /*Teste de verificação de data*/

                                                while((comp == 0 || comp == 1) && (trys != 3)){
                                                        printf("\nPrazo inserido nao valido. Tente novamente.\n\n");
                                                        printf("Novo Prazo final ");
                                                        pos->tarefa->prazo = set_data();
                                                        comp = compare_date(pos->tarefa->inicio,pos->tarefa->prazo);
                                                        trys++;
                                                }
                                                if(trys == 3){
                                                        printf("\nExcedeu o numero maximo de tentativas para corrigir o erro.\n");
                                                        printf("\nTodas as alteracoes serao revertidas.\n");
                                                }


                                        }

                                        if(tipo == 2){
                                                pos->tarefa->fim = NULL;
                                        }
                                        if(trys != 3){
                                                pos->tarefa->fase = fase;
                                                insere_tarefa(to,pos->tarefa,3);
                                                elimina_no_task(from,ante,pos);
                                        }

                                }
                        }
                        else if(!passed){
                                printf("\nImpossivel mover tarefa para sector uma vez que nao foi associada com sucesso.\n");
                        }
                        else{
                                printf("ID errado. Tente novamente.\n\n");
                        }

                }
                else if(flag == 0){

                        printf("\nVer lista de tarefas disponiveis? [ 1 - sim / 0 - nao]\n-> ");
                        scanf("%d",&passed);
                        getchar();

                        if(passed){
                                imprime_lista_tarefas(from);
                                printf("\n");
                        }

                        printf("ID da tarefa: ");
                        scanf("%d",&id);
                        getchar();
                        found = get_task(from,&ante,&pos,id);
                        printf("%d",found);

                        if(found){

                                if(tipo == 1){   /* Colocar data de conclusao */

                                        if(fase == 3){
                                                printf("\nPor favor indique a data de conclusao da tarefa:\n");
                                                printf("Data de conclusao ");
                                                pos->tarefa->fim = set_data();

                                                while(check_date_erros(pos->tarefa->fim) && trys != 3){
                                                        printf("Data de conclusao ");
                                                        pos->tarefa->fim = set_data();
                                                        trys++;
                                                }

                                                if(trys != 3){

                                                        trys = 0;

                                                        comp = compare_date(pos->tarefa->prazo,pos->tarefa->fim);
                                                        comp2 = compare_date(pos->tarefa->inicio,pos->tarefa->fim);

                                                        while((comp2 == 1 || comp == -1) && trys != 3){
                                                                printf("\nData de conclusao inserida nao valida. Tente novamente.\n\n");
                                                                printf("Data de conclusao ");
                                                                pos->tarefa->fim = set_data();
                                                                comp = compare_date(pos->tarefa->prazo,pos->tarefa->fim);
                                                                comp2 = compare_date(pos->tarefa->inicio,pos->tarefa->fim);
                                                                trys++;
                                                        }
                                                }
                                                else{

                                                        printf("\nExcedeu o numero maximo de tentativas para corrigir o erro.\n");
                                                        printf("\nTodas as alteracoes serao revertidas.\n");

                                                }
                                        }

                                         if(trys == 3){
                                                        printf("\nExcedeu o numero maximo de tentativas para corrigir o erro.\n");
                                                        printf("\nTodas as alteracoes serao revertidas.\n");
                                        }
                                        else{
                                                if(fase == 3){
                                                        insere_tarefa(to,pos->tarefa,1);
                                                }else if(fase == 2){
                                                        insere_tarefa(to,pos->tarefa,3);
                                                        pos->tarefa->fim = NULL;
                                                }
                                                pos->tarefa->fase = fase;
                                                get_task(pos->tarefa->worker->mytasks,&bef,&then,pos->tarefa->id);
                                                elimina_no_task(pos->tarefa->worker->mytasks,bef,then);
                                                insere_tarefa(pos->tarefa->worker->mytasks,then->tarefa,5);
                                        }

                                }

                                else if(tipo == 0){
                                        desassocia_tarefa(pos->tarefa);   /* Desvincula trabalhador da tarefa atual */
                                        pos->tarefa->fim = NULL;
                                        pos->tarefa->fase = fase;
                                        insere_tarefa(to,pos->tarefa,2);
                                }
                                if(trys != 3){
                                        elimina_no_task(from,ante,pos);
                                }

                        }
                        else{
                                printf("\nAlgo correu mal. Tente novamente.\n\n");
                        }
                }
        }
        free(idp);

        printf("Pressione Enter para continuar... ");
        getchar();

}

int compare_date(Data *d1, Data *d2){ /*Comparar datas*/

        long int ex_d1 = (d1->ano * 10000) + (d1->mes * 100) + d1->dia;
        long int ex_d2 = (d2->ano * 10000) + (d2->mes * 100) + d2->dia;

        int comp = 0;

        if(ex_d1 > ex_d2){
                comp = 1;
        }else if(ex_d1 < ex_d2){
                comp = -1;
        }

        return comp;

}

void switch_worker(lista_task doing , lista_pessoas geral){ /*Alterar trabalhador responsavel por tarefa*/

        int week_check;
        int choice, id, found;
        lista_task ante, then;
        lista_pessoas ant, atual;

        system("cls");

        if(doing->next != NULL && geral->next != NULL){

                printf("\nVer todas as tarefas atribuidas? [ 1- sim / 0 - nao ]\n->");
                scanf("%d",&choice);
                getchar();

                if(choice){
                        imprime_lista_tarefas(doing);
                }

                printf("ID da tarefa: ");
                scanf("%d",&id);
                getchar();

                found = get_task(doing,&ante,&then,id);


                if(found){

                        printf("\nVer lista de trabalhadores? [ 1 - sim / 0 - nao ]\n->");
                        scanf("%d",&choice);
                        getchar();
                        if(choice){
                                imprime_lista_pessoas(geral);
                        }

                        printf("ID do trabalhador: ");
                        scanf("%d",&id);
                        getchar();

                        found = get_worker(geral,&ant,&atual,id);

                        if(found){

                                week_check = weekly_gap(atual->p->mytasks,then->tarefa->prazo);
                                if((atual->p->mytasks->n < atual->p->max_task) && week_check != 1 ){

                                        desassocia_tarefa(then->tarefa);
                                        elimina_no_task(doing,ante,then);
                                        then->tarefa->worker = atual->p;
                                        then->tarefa->personId = atual->p->id;
                                        insere_tarefa(atual->p->mytasks,then->tarefa,0);
                                        insere_tarefa(doing,then->tarefa,3);

                                }else if(week_check == 1){
                                        printf("\nEste trabalhador ja tem tarefas esta semana.\n");
                                }else{
                                        printf("\nEste trabalhador ja atingiu o limite maximo de tarefas.\n");
                                }
                        }else{
                                printf("\nAlgo esta errado. Tente novamente.\n\n");
                        }
                }else{
                        printf("\nTarefa nao encontrada.\n");
                }
        }else{
                printf("\nSem tarefas atribuidas.\n");
        }

        printf("Pressione Enter para continuar... ");
        getchar();

}

int check_date_erros(Data *data){ /*Detecao de erros em datas*/

        int error = 0;

         if( (data->dia <= 0 || data->dia > 31) || (data->mes <= 0 || data->mes > 12) || (data->dia > 29 && data->mes == 2 && data->ano % 4 == 0) || (data->dia > 28 && data->mes == 2 && data->ano % 4 != 0)){
                printf("\nData introduzida nao valida. Insira novamente.\n\n");
                error = 1;
        }

        return error;

}

int get_week_day(Data *d1){ /* verificação semanal */

        int d = d1->dia;
        int m = d1->mes;
        int y = d1->ano;
        int week_day;

        if ( m < 3 ){
                d = d + y;
                y--;
        }
        else{
                d = d + y - 2;
        }

        week_day = (23 * m/9) + d + 4 + y/4 - y/100 + y/400; /*gauss algorithm*/
        week_day = week_day % 7;

        return week_day;

}

int weekly_gap(lista_task lista, Data*d2){ /*Verificar se os prazos estão presentes na mesma semana*/

        lista_task ant = lista;
        lista_task prox =  ant->next;
        int dia,mes,ano;
        int dif;
        int checker = 0;
        int wday = get_week_day(d2);
        int wday_v;

        while(prox != NULL && checker != 1){

                dia = prox->tarefa->prazo->dia;
                mes = prox->tarefa->prazo->mes;
                ano = prox->tarefa->prazo->ano;

                wday_v = get_week_day(prox->tarefa->prazo);

                if(d2->ano == ano){
                        if(d2->mes == mes){
                                dif = d2->dia - dia;
                                if(dif >= -6 && dif <= 0){
                                        if(wday >= 0 && wday < wday_v){
                                                checker = 1;
                                        }
                                }
                                if(dif <= 6 && dif >= 0){
                                        if(wday > wday_v && wday <= 6){
                                                checker = 1;
                                        }
                                }
                        }
                }



                ant = prox;
                prox = prox->next;

        }

        return checker;

}

/*******************************************************************
*
*                                                 EIMINAÇÃO DE DADOS
*
********************************************************************/

void elimina_no_task(lista_task tarefa, lista_task ant, lista_task act){ /* Função para retirar elemento de uma lista de tarefas */

        tarefa->n--;
        ant->next = act->next;
        printf("\nTarefa eliminada com sucesso.\n\n");

}

void eliminate_task(lista_task lista, lista_task todo, lista_task done){ /* elimina tarefa permanentemente */

        int id, found;
        lista_task ant;
        lista_task act;

        system("cls");
        imprime_lista_tarefas(lista);

        printf("\nID da tarefa para eliminacao: ");
        scanf("%d",&id);
        getchar();

        found = get_task(lista,&ant,&act,id);

        if(found){
                if(act->tarefa->fase == 2 || act->tarefa->fase == 3){
                        printf("\nNao e possivel eliminar tarefas que tenham trabalhadores associados.\n\n");
                }else{
                        elimina_no_task(lista,ant,act);
                        if(act->tarefa->fase == 1){
                                get_task(todo,&ant,&act,id);
                                elimina_no_task(todo,ant,act);
                        }else if(act->tarefa->fase == 3){
                                get_task(done,&ant,&act,id);
                                elimina_no_task(done,ant,act);
                        }
                        free(act);
                }
        }else{
                printf("\nTarefa nao encontrada. Tente novamente.\n\n");
        }

        printf("Pressione Enter para continuar... ");
        getchar();

}

void elimina_no_worker(lista_pessoas lista, lista_pessoas ant, lista_pessoas act){ /* elimina no da lista e liberta a sua memoria*/

        lista->n--;
        ant->next = act->next;
        free(act);
        printf("\nTrabalhador eliminado com sucesso.\n\n");


}

void eliminate_worker(lista_pessoas lista){ /*eliminar trabalhador permanentemente */

        int id, found;
        lista_pessoas ant;
        lista_pessoas act;

        system("cls");
        imprime_lista_pessoas(lista);

        printf("\nID de trabalhador para eliminacao: ");
        scanf("%d",&id);
        getchar();

        found = get_worker(lista,&ant,&act,id);

        if(found){
                if(act->p->mytasks->n > 0){
                        printf("\nNao e possivel eliminar um trabalhador com tarefas associadas.\n\n");
                }else{
                        elimina_no_worker(lista,ant,act);
                }
        }else{
                printf("\nTrabalhador nao encontrado. Tente Novamente.\n\n");
        }

        printf("Pressione Enter para continuar... ");
        getchar();

}

/*******************************************************************
*
*                                                 FILE MANAGMENT SECTION
*
********************************************************************/


void upload_workers(Pessoa *nova, lista_pessoas lista, lista_pessoas rep){ /* carregamento de trabalhadores em ficheiro */

        lista_pessoas no = (lista_pessoas)malloc(sizeof(P_Node));
        lista_pessoas act = lista->next;
        lista_pessoas then = lista;


        no->p = nova;
        no->n = 0;


        if(lista->next == NULL){

                lista->n++;
                no->next = lista->next;
                lista->next = no;
        }
         else{

                while(act->next != NULL && no->p->id > act->p->id){
                        then = act;
                        act = act->next;
                }
                if(no->p->id < act->p->id){
                        lista->n++;
                        then->next = no;
                        no->next = act;
                }else if(no->p->id == act->p->id){
                        rep->n++;
                        lista->n++;
                        no->next = rep->next;
                        rep->next =no;
                }else{
                        lista->n++;
                        no->next = act->next;
                        act->next = no;
                }
        }


}

void correct_id(lista_pessoas lista, lista_pessoas rep){ /*Coloca o ids corretamente, corrigindo os repetidos*/

        lista_pessoas ante;
        lista_pessoas post;
        lista_pessoas act = rep->next;
        int done = 1;

        while(act !=NULL){
                ante = lista;
                post = ante->next;
                done = 1;
                while(done != 0 && post->next != NULL){

                        if(act->p->id == post->p->id){
                                act->p->id++;
                                ante = post;
                                post = post->next;
                        }else if(act->p->id > post->p->id){
                                ante = post;
                                post = post->next;
                        }else{
                                rep->next = act->next;
                                ante->next = act;
                                act->next = post;
                                done = 0;
                        }
                }
                if(done != 0){
                       if(act->p->id == post->p->id){
                                rep->next = act->next;
                                act->p->id++;
                                act->next = post->next;
                                post->next = act;
                        }else if(act->p->id > post->p->id){
                                rep->next = act->next;
                                act->next = post->next;
                                post->next = act;
                        }else{
                                rep->next = act->next;
                                ante->next = act;
                                act->next = post;
                        }
                }
                act = rep->next;

        }

}

void upload_info(lista_pessoas P_Lista){ /* carregamento de informacao em ficheiro */

        int i , j, l;
        int max_t;
        FILE *file = fopen("workers.txt","r");
        char *p, *q;
        char line[1024] = "";
        char temp[1024] = "";
        Pessoa *nova;
        lista_pessoas repetidos = cria_lista_pessoas();

        printf("\n\n____  LOADING INFORMATION ____\n\n");

        if(file == NULL){
                printf("ERROR.");
                exit(1);
        }
        l = 0;

        while( fgets(line,1024,file) != NULL ){
                l++;
                p = line;
                j = 0;


                for(i = 0; i < strlen(line); i++){
                        if(line[i] == ','){
                                j++;
                        }
                }
                if((j == 3 || j == 4) && l > 4){
                        j = 0;
                        nova = (Pessoa *)malloc(sizeof(Pessoa));
                        nova->mytasks = cria_lista_tarefas();
                        nova->max_task = max_t;
                        while(*p != '\n' && *p != '\0'){
                                q = temp;
                                i = 0;
                                while( *p != ',' && *p != '\n' && *p != '\0'){
                                        *q = *p;
                                        q++;
                                        p++;
                                        i++;
                                }
                                if( j == 0 ){
                                        nova->nome = (char *)malloc(i*sizeof(char));
                                        sprintf(nova->nome,"%s",temp);
                                }else if(j == 1){
                                        nova->idade = atoi(temp);
                                }else if(j == 2){
                                        nova->mail = (char *)malloc(i*sizeof(char));
                                        sprintf(nova->mail,"%s",temp);
                                }else if(j == 3){
                                        nova->id = atoi(temp);
                                }
                                j++;
                                memset(temp, 0, sizeof(temp));
                                p++;

                        }
                        upload_workers(nova,P_Lista,repetidos);
                }else if(l == 1){
                        sscanf(line,"%s %d",temp,&max_t);
                        memset(temp, 0, sizeof(temp));
                }

        }
        if(repetidos->n > 0){
                correct_id(P_Lista,repetidos);
        }
        fclose(file);


}

void put_on_text(lista_pessoas lista){ /* escreve informacao dos trabalhadores em ficheiro em ficheiro*/

        FILE *file = fopen("workers.txt","w");
        char *pos;
        lista_pessoas act = lista->next;
        Pessoa *worker;

        fprintf(file,"NUMERO_TAREFAS_MAXIMO: %d\n\nFormato correto -> [nome,idade,email,ID]\n\n",act->p->max_task);

        while(act != NULL){

                worker = act->p;

                if ((pos=strchr(worker->nome, '\n')) != NULL)
                        *pos = '\0';
                if ((pos=strchr(worker->mail, '\n')) != NULL)
                        *pos = '\0';

                fprintf(file,"%s,%d,%s,%d,\n",worker->nome,worker->idade,worker->mail,worker->id);
                act = act->next;
        }



        fclose(file);
}

void put_on_text_task(lista_task lista){ /* escreve em ficheiro as tarefas */

        FILE *file = fopen("task.txt","w");
        char *pos;
        lista_task act = lista->next;
        Task *tarefa;

        int id, idperson;
        int diai,mesi,anoi;
        int diaf,mesf,anof;
        int diap,mesp,anop;
        int fase;
        int prio;

        fprintf(file,"[ID,Prioridade,Definição,Data_inicio,Data_fim,Prazo,fase]\n\n");

        while(act != NULL){

                tarefa = act->tarefa;

                prio = tarefa->priority;
                id = tarefa->id;
                fase = tarefa->fase;
                idperson = tarefa->personId;
                diai = tarefa->inicio->dia;
                mesi = tarefa->inicio->mes;
                anoi = tarefa->inicio->ano;

                diap = tarefa->prazo->dia;
                mesp = tarefa->prazo->mes;
                anop = tarefa->prazo->ano;

                if(tarefa->fim){
                        diaf = tarefa->fim->dia;
                        mesf = tarefa->fim->mes;
                        anof = tarefa->fim->ano;
                }else{
                        diaf = mesf = anof = 0;
                }


                if ((pos=strchr(tarefa->descricao, '\n')) != NULL){
                        *pos = '\0';
                }

                fprintf(file,"%d,%d,%s,%d,%d/%d/%d,%d/%d/%d,%d/%d/%d,%d\n",id,prio,tarefa->descricao,idperson,diai,mesi,anoi,diaf,mesf,anof,diap,mesp,anop,fase);

                act = act->next;
        }



        fclose(file);

}

Data *translate_date(char *data){ /* transcreve data para interios em estrutura Data*/

        int dia,mes,ano;
        int i,j = 0;
        int s = 0;
        int comp = strlen(data);
        char *p = data;
        char temp[4];
        Data *d = (Data*)malloc(sizeof(Data));

        for(i = 0; i < comp ; i++){

                if(*p == '/' || p == '\0'){

                        if(s == 0){
                                dia = atoi(temp);
                        }else if(s == 1){
                                mes = atoi(temp);
                        }
                        memset(temp,0,sizeof(temp));
                        j = 0;
                        s++;
                }
                else{
                        temp[j] = *p;
                        j++;
                }
                p++;

        }
        ano = atoi(temp);
        d->dia = dia; d->mes = mes; d->ano = ano;
        return d;
}

void sector_selector(lista_task Todo, lista_task Doing, lista_task Done, lista_pessoas P_Lista, Task *task){ /*coloca a tarefa no sector correto*/

        int get;
        lista_pessoas worker;
        lista_pessoas ante;

        if(task->fase == 1){
                insere_tarefa(Todo,task,2);
        }
        else if( task-> fase == 2 || task->fase == 3){

                if(P_Lista->n != 0){

                        get = get_worker(P_Lista,&ante,&worker,task->personId);
                        printf("%d",get);

                        if(get == 0 ){
                                task->personId = 0;
                                task->fase = 1;
                                insere_tarefa(Todo,task,2);
                        }
                        else if(task->fase ==2){
                                task->worker = worker->p;
                                insere_tarefa(worker->p->mytasks,task,5);
                                insere_tarefa(Doing,task,3);
                        }
                        else if(task->fase == 3){
                                task->worker = worker->p;
                                insere_tarefa(worker->p->mytasks,task,5);
                                insere_tarefa(Done,task,1);
                        }

                }else{
                        task->personId = 0;
                        task->fase = 1;
                        insere_tarefa(Todo,task,2);
                }
}
}

void upload_info_task(lista_task T_Lista, lista_task To_do, lista_task Doing, lista_task Done, lista_pessoas P_Lista){ /* carregamento de informacao em ficheiro */

        int i , j = 0;
        int l = 0;
        int p = 0;
        FILE *file = fopen("task.txt","r");
        char line[100] = "";
        char temp[100] = "";
        int comp;
        char *pString;
        Task *task;

        printf("\n\n____  LOADING INFORMATION ____\n\n");

        if(file == NULL){
                printf("ERROR LOADING FILE.");
                exit(1);
        }

        while( fgets(line,200,file) != NULL ){
                l++;
                j= 0;
                comp = strlen(line);
                p = 0;
                task = (Task*)malloc(sizeof(Task));

                for(i = 0; i < strlen(line); i++){
                        if(line[i] == ','){
                                j++;
                        }
                }

                if((j == 6 || j == 7) && l >= 3){
                        for(i = 0; i < comp; i++){
                                j = 0;
                                while(line[i] != ',' && line[i] != '\n' && line[i] != '\0'){
                                        temp[j] = line[i];
                                        j++;
                                        i++;
                                }
                                pString = (char *)malloc(j*sizeof(char));
                                pString = temp;
                                p++;

                                if(p == 1){
                                        task->id = atoi(pString);
                                }else if(p == 2){
                                        task->priority = atoi(pString);
                                }else if(p == 3){
                                        task->descricao  = (char *)malloc(j*sizeof(char));
                                        sprintf(task->descricao,"%s",temp);
                                }else if(p == 4){
                                        task->personId = atoi(pString);
                                }else  if(p == 5){
                                        task->inicio = translate_date(pString);
                                }else  if(p == 6){
                                        if(pString[0] == '0' ){
                                                task->fim = NULL;
                                        }else{
                                                task->fim = translate_date(pString);
                                        }
                                }else  if(p == 7){
                                        task->prazo = translate_date(pString);
                                }else{
                                        task->fase = atoi(pString);
                                }
                                memset(temp,0,sizeof(temp));
                                task->worker = NULL;
                        }
                        sector_selector(To_do,Doing,Done,P_Lista,task);
                        insere_tarefa(T_Lista,task,0);
                }

        }
        system("cls");
        imprime_lista_pessoas(P_Lista);
        imprime_lista_tarefas(T_Lista);
        system("cls");
        fclose(file);
}
