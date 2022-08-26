Para fazer a integração do calendário, siga os seguintes passos:

- Faça o import do script para onde deseja utilizar
  <a href="https://unpkg.com/@andremhirai1/calendar@1.5.1/calendar.js">https://unpkg.com/@andremhirai1/calendar@1.5.1/calendar.js</a>
- Crie uma div com uma classe identificadora. 
  ```<div class="calendar"> </div>```
- Instancie um objeto dessa forma:

```
<script>
    const options = {
        url: "URL-BACKEND",
        parameters:{
            month: "mes",
            year: "ano"
        },
        weekdays: "short"
    }
    const calendar = new Calendar(".calendar", options)
</script>
```

- O segundo parâmetro recebe um objeto com as possíveis opções (Esse parâmetro é opcional):

<table>
    <tr>
        <td>url (String) </td>
        <td>Url para fazer a requisicao pro servidor e buscar a lista de eventos do mes</td>
    </tr>
    <tr>
        <td>weekdays (String)</td>
        <td>Apresentação dos dias da semana. Opções: short(3 letras) ou narrow(1 letra)</td>
    </tr>
    <tr>
        <td>parameters (Objeto)</td>
        <td>Objeto que tem 2 parâmetros. (month & year)</td>
    </tr>
    <tr>
        <td>month (String)</td>
        <td>Nome do parâmetro do mês. Default name = month</td>
    </tr>
    <tr>
        <td>year (string)</td>
        <td>Nome do parâmetro do year. Default name = year</td>
    </tr>
</table>
