class No{
    constructor (novoDado){
        this.dado = novoDado;
        this.ant = null;
        this.prox = null;
    }
}
//-----------------------
class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
// Adiciona um novo dado
    add(novoDado){
        console.log("add");
        const novoNo = new No(novoDado);
        if(novoNo===null)
            return false;
        if(this.head===null)// vazia
            this.tail = novoNo;
        else{
            novoNo.prox = this.head;
            this.head.ant = novoNo;
        }
        this.head = novoNo;
        this.length++;
        return true;
    }
    //Adiciona um novo dado a ultima posição.
    addLast(novoDado){
        const novoNo = new No(novoDado);
        if(novoNo===null)
            return false;

        if(this.head===null)// vazia
            this.head = novoNo;
        else{
           novoNo.ant = this.tail;
           this.tail.prox = novoNo;

        }
        this.tail = novoNo;
        this.length++;
        return true;
    }
    //Pega o primeiro item da lista sem remove-lo.
    peek(){
      const dadoPeek = this.head.dado;
      return dadoPeek;
    }
    //Remove o primeiro item da lista(Resolve a primeira tarefa)
    removeFirst(){
        const dadoRemovido = this.head.dado;
        this.head = this.head.prox;
        if(this.head!==null)
            this.head.ant = null;
        else
            this.tail = null;
        this.length--;
        return dadoRemovido;
    }
    isEmpty(){
        //if(this.head===null)
        //    return true;
        //return false;
        return this.head === null;
    }

    //-------------------------------------
//Quando um objeto tem uma propriedade [Symbol.iterator], ele pode ser iterado com construções como [ for(const item of minhaLista)*/


[Symbol.iterator]() {         
    let currentNode = this.head;
          return {
            next: function() {
              if (currentNode!==null) {
                let value = currentNode.dado;
                currentNode = currentNode.prox;
                return { value: value, done: false };
              } else {
                return { done: true };
              }
            }
          };
        }
  //—----------------
    toString() {
          let result = "";
          let currentNode = this.head;
          while (currentNode !== null) {
              result += currentNode.dado + (currentNode.prox ? " -> " : "");
              currentNode = currentNode.prox;
          }
          return result;
      }
   //----------------   
   addAtIndex(index, data) {
    console.log("Index:"+index);
    if (index < 0) {
      console.log("Indice invalido. O indice deve ser um valor inteiro maior ou igual a zero.");
      return false;
    }
  
    if (index === 0) {
      // Se o índice for zero, chama o método add() para adicionar no início da lista
      console.log("Adicionando no inicio");
      return this.add(data);
    }

    if (index >= this.length) 
      return  this.addLast(data);

    const novoNo = new No(data);
    console.log("Novo no"+novoNo);
    if (novoNo === null) 
      return false;
    
    let noAtual = this.head;
    let indiceAtual = 0;
    while (indiceAtual < index - 1) {
      // Percorre a lista até encontrar o nó anterior ao índice especificado
      noAtual = noAtual.prox;
      indiceAtual++;
    }
    // reorganiza os ponteiros
    novoNo.ant = noAtual;
    novoNo.prox = noAtual.prox;
    noAtual.prox.ant = novoNo;
    noAtual.prox = novoNo;
    this.length++;
    return true;
  }
  

}// fim classe LinkedList