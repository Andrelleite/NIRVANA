#ifndef HEADER_H_INCLUDED
#define HEADER_H_INCLUDED

/**Lists**/

typedef struct node* lista_task;

typedef struct person_node* lista_pessoas;

/**Stucts**/

typedef struct data{ /*estrutura para datas */

        int dia;
        int mes;
        int ano;

}Data;

typedef struct pessoa{ /*estrutura para trabalhadores*/

        int id;
        char *nome;
        int idade;
        char *mail;
        int max_task;
        lista_task mytasks;


}Pessoa;

typedef struct task{ /*estrutura para tarefas*/

        int id;
        int personId;
        int fase;
        int priority;
        Data *inicio;
        Data *fim;
        Data *prazo;
        char *descricao;
        Pessoa *worker;

}Task;

typedef struct node{ /* Lista ligada para tarefas*/

        int n;
        Task *tarefa;
        lista_task next;

}Node;

typedef struct person_node{ /*Lista ligada para pessoas */

        int n;
        Pessoa *p;
        lista_pessoas next;

}P_Node;

/**Function Declarations**/

lista_task cria_lista_tarefas();

lista_pessoas cria_lista_pessoas();

Pessoa *cria_pessoa(lista_pessoas lista);

Task *cria_tarefa(lista_task lista);

void insere_pessoa(lista_pessoas lista);

void insere_tarefa(lista_task lista, Task *tarefa, int flag);

int get_task(lista_task lista,lista_task *ant ,lista_task *act, int id);

void imprime_lista_pessoas(lista_pessoas lista);

void imprime_lista_tarefas(lista_task lista);

int get_worker(lista_pessoas lista,lista_pessoas *ant, lista_pessoas *act, int id);

void worker_info(lista_pessoas lista);

Data *set_data();

int atribui_tarefa(lista_pessoas lista_p, lista_task lista_t, int *idp);

void elimina_no_task(lista_task tarefa, lista_task ant, lista_task act);

void desassocia_tarefa(Task *task);

void pass_section(lista_task from, lista_task to, lista_pessoas lista_p, int flag, int tipo, int fase);

int compare_date(Data *d1, Data *d2);

void switch_worker(lista_task doing , lista_pessoas geral);

int check_date_erros(Data *data);

void upload_info(lista_pessoas P_Lista);

void upload_workers(Pessoa *nova, lista_pessoas lista, lista_pessoas rep);

void put_on_text(lista_pessoas lista);

int check_order(lista_pessoas lista);

void put_on_text_task( lista_task T_Lista);

void upload_info_task(lista_task T_Lista, lista_task To_do, lista_task Doing, lista_task Done, lista_pessoas P_Lista);

void sector_selector(lista_task Todo, lista_task Doing, lista_task Done, lista_pessoas P_Lista, Task *task);

int weekly_gap(lista_task lista, Data*d2);

Data *translate_date(char *data);

void eliminate_task(lista_task lista, lista_task todo, lista_task done);

void eliminate_worker(lista_pessoas lista);

void elimina_no_worker(lista_pessoas lista, lista_pessoas ant, lista_pessoas act);

#endif
