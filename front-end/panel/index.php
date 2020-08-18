<?php
    require('./modules.php')
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<link rel='shortcut icon' href='../src/images/icon.ico'/>
		<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>        
        <meta charset="utf-8">

		<link href='../src/styles/logged.css' rel='stylesheet'>
        <title>Painel</title>
        
        <link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet"> 
	</head>
	<body>
        <div id="greyPanel" hidden> 
            <div id="modal">
                <div id="modalHeader">
                    <div id="modalBackIcon" onclick="ModalReturn()">
                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"/>
                            <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
                          </svg>
                    </div>
                    <div id="modalTitle">Alteração / Cadastro de Usuário </div>
                </div>
                <div id="modalContent">
                    <div id ="modalChangeUser" hidden>
                    <div id="tableOutterDiv">
                        <table id="tableChangeUser">
                            <thead>
                                <tr>
                                    <td>CPF</td>
                                    <td>Nome</td>
                                    <td>Telefone</td>
                                    <td>Residencia</td> 
                                    <td>Bloco</td> 
                                    <td>Permissão</td>
                                    <td>Deletar</td>
                                </tr>
                            </thead>
                            <tbody id="tableChangeUserBody">

                            </tbody>
                        </table>
                        </div>
                        <div id="outterFormDiv">
                            <form method="post" onsubmit="return false">
                                <div class="modalInputDiv">
                                    <label>Insira o CPF do usuário</label>
                                    <input type="text" placeholder="CPF" id="changeUserCpf">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira a senha do usuário</label>
                                    <input type="text" placeholder="Senha" id="changeUserPass">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira o nome do usuário</label>
                                    <input type="text" placeholder="Nome" id="changeUserName">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira o telefone do usuário</label>
                                    <input type="text" placeholder="Telefone" id="changeUserPhone">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira o número da residência</label>
                                    <input type="number" placeholder="Número residência" id="changeUserHouseNum">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira o bloco do usuário</label>
                                    <input type="number" placeholder="Bloco" id="changeUserBlockNum">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira a permissão do usuário</label>
                                    <select id="changeUserProfile">
                                        <option>morador</option>
                                        <option>subsindico</option>
                                        <option>sindico</option>
                                        <option>zelador</option>
                                        <option>porteiro</option>
                                    </select>
                                </div>
                                <div class="modalInputDiv submitButton">
                                    <input type=submit value="Registrar" onclick="ChangeUser()">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id ="modalLostAndFound" hidden>
                        <div id="tableOutterDiv">
                        <table id="tableLostAndFound">
                            <thead>
                                <tr>
                                    <td>id ticket</td>
                                    <td>descrição</td>
                                    <td>local</td> 
                                    <td>encontrado por:</td>
                                </tr>
                            </thead>
                            <tbody id="tableLostAndFoundBody">

                            </tbody>
                        </table>
                        </div>
                    <?php if($_COOKIE['permission'] == 'zelador'){
                echo(   '<div id="outterFormDiv">
                        <form method="post" onsubmit="return false">
                            <div class="modalInputDiv">
                                <label>Insira o número do ticket (para tickets já criados)</label>
                                <input type="number" placeholder="Id ticket" id="idTicket">
                            </div>
                            <div class="modalInputDiv">
                                <label>Insira o CPF do usuário que encontrou</label>
                                <input type="text" placeholder="Cpf" id="lostAndFoundCpf1">
                            </div>
                            <div class="modalInputDiv">
                                <label>Insira o CPF do usuário que retirou (para tickets já criados)</label>
                                <input type="text" placeholder="Cpf" id="lostAndFoundCpf2">
                            </div>
                            <div class="modalInputDiv">
                                <label>Insira o local em que o item foi encontrado</label>
                                <input type="text" placeholder="Local" id="lostAndFoundPlace">
                            </div>
                            <div class="modalInputDiv">
                                <label>Insira uma descrição do item</label>
                                <input type="text" placeholder="Descrição" id="lostAndFoundText">
                            </div>
                            <div class="modalInputDiv submitButton">
                                <input type=submit value="Registrar" onclick="LostAndFound()">
                            </div>
                            <div class="modalInputDiv submitButton" style="color:grey;">
                            (Tickets já retirados não aparecerão na listagem)
                        </div>
                        </form>
                    </div>');
                    }else{
                        echo('<div id="outterFormDiv">
                        <form method="post" onsubmit="return false">
                            <div class="modalInputDiv submitButton" style="color:grey;">
                            (Apenas o zelador poderá cadastrar/alterar os itens listados acima)
                        </div>
                        </form>
                    </div>');
                    }  ?>
                    </div>
                    <div id ="modalPartyRoom" hidden>
                    <div id="tableOutterDiv">
                        <table id="tablePartyRoom">
                            <thead>
                                <tr>
                                    <td>Id reserva</td>
                                    <td>Responsável</td>
                                    <td>Inicio</td>
                                    <td>Fim</td> 
                                </tr>
                            </thead>
                            <tbody id="tablePartyRoomBody">

                            </tbody>
                        </table>
                        </div>
                        <div id="outterFormDiv">
                            <form method="post" onsubmit="return false">
                                <div class="modalInputDiv">
                                    <label>Insira o horário de início</label>
                                    <input type="text" placeholder="ex. 12:30" id="partyRoomStart">
                                </div>
                                <div class="modalInputDiv">
                                    <label>Insira o horário de término</label>
                                    <input type="text" placeholder="ex. 12:30" id="partyRoomEnd">
                                </div>
                                <div class="modalInputDiv submitButton">
                                    <input type=submit value="Registrar" onclick="PartyRoom()">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id ="modalRegisterTicket" hidden>
                    <div id="tableOutterDiv">
                        <table id="tableRegisterTicket">
                            <thead>
                                <tr>
                                    <td>Id reserva</td>
                                    <td>Descrição</td>
                                    <td>Responsável</td>                                    
                                </tr>
                            </thead>
                            <tbody id="tableRegisterTicketBody">

                            </tbody>
                        </table>
                        </div>
                    <div id="outterFormDiv">
                        <form method="post" onsubmit="return false">
                            <div class="modalInputDiv">
                                <label>Insira o ID da reserva</label>
                                <input type="number" placeholder="Id reserva" id="ticketId">
                            </div>
                            <div class="modalInputDiv">
                                <label>Selecione o tipo de ocorrência</label>
                                <select id="ticketType">
                                    <option>pertubacao de sossego</option>
                                    <option>horario limite utrapassado</option>
                                    <option>outros</option>
                                </select>
                            </div>
                            <div class="modalInputDiv submitButton">
                                <input type=submit value="Registrar" onclick="RegisterTicket()">
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="navBar">
            <div id="navBarTitle">
                Sol Nascente
            </div>
        </div>
        <div id="panel">
            <div id="panelObscure"></div>
            <div id="innerPanel">
        <?php
        
        if($_COOKIE['permission'] == 'sindico' || $_GET['permission'] == 'subsindico'){
            echo($ModuleChangePerson);
            echo($ModuleLostAndFound);
            echo($ModulePartyRoom);
            echo($ModuleRegisterTicket);
        }else if($_COOKIE['permission'] == 'morador' || $_COOKIE['permission'] == 'zelador'){
            echo($ModuleLostAndFound);
            echo($ModulePartyRoom);
            echo($ModuleRegisterTicket);
        }
        
        ?>
            </div>
        </div>
        <script>
            <?php if($_COOKIE['permission'] == 'sindico' || $_COOKIE['permission'] == 'subsindico'){	
                echo('GetChangeUser();');	
            }?>
            
            async function GetChangeUser(){

               let response = await fetch('http://18.222.162.205:3000/user/list', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'get',
                })

                response = await response.json()
                document.getElementById('tableChangeUserBody').parentNode.removeChild(document.getElementById('tableChangeUserBody'));
                newTbody = document.createElement('tbody')
                newTbody.setAttribute('id', 'tableChangeUserBody')
                document.getElementById('tableChangeUser').appendChild(newTbody)
                response.forEach(MountChangeUserTable)
            }
            function MountChangeUserTable(element, index, array){
                row = document.createElement('tr')

                tempObj = {cpf:element.cpf,name:element.name,telephone:element.telephone,number:element.number,block:element.block,profile:(element.profile||element.office)}

                for(i = 0;i < 6;i++){
                    let data = document.createElement("td")
                    if(Object.values(tempObj)[i] == null){
                        data.innerHTML = ''
                    }else{
                        data.innerHTML = Object.values(tempObj)[i]
                    }
                    row.appendChild(data)
                }
                let data = document.createElement("td")
                data.innerHTML = '<img src="../src/images/delete.png" width="15px" id="deleteImage" onclick="DeleteUser(\''+element.cpf+'\')">'
                row.appendChild(data)

                document.getElementById('tableChangeUserBody').appendChild(row)
            }

            async function DeleteUser(userCpf){   

                userCpf = userCpf.replace(/\./g,'')
                userCpf = userCpf.replace('-','')

                const payload = JSON.stringify({
                    cpf:userCpf,
                })
				
               let response = await fetch('http://18.222.162.205:3000/user/delete', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'delete',
                    body: payload,
                })

                response = await response.json()
                GetChangeUser()
            }

            async function ChangeUser(){
                let cpf = document.getElementById('changeUserCpf').value
                let name = document.getElementById('changeUserName').value
                let telephone = document.getElementById('changeUserPhone').value
                let houseNum = parseInt(document.getElementById('changeUserHouseNum').value)
                let blockNum = parseInt(document.getElementById('changeUserBlockNum').value)
                let password = document.getElementById('changeUserPass').value
                let profile = document.getElementById('changeUserProfile').value
                
                if(profile == 'zelador' || profile == 'porteiro'){
                    var url = 'http://18.222.162.205:3000/employee'
                    var numSal = 1500.00;
                }else{
                    var url = 'http://18.222.162.205:3000/resident'
                }

                let payload = { cpf }

                if(password) payload = { ...payload, password }
                if(name) payload = { ...payload, name }

                let resident = {}
                if(telephone) resident = { ...resident , telephone }
                if(houseNum) resident = { ...resident , number: houseNum }
                if(blockNum) resident = { ...resident , block: blockNum }
                if(profile) resident = { ...resident , profile }

                const employee = { office: profile, salary: numSal }

                if(profile == "zelador" || profile == "porteiro") {
                    payload = JSON.stringify({ ...payload, ...employee }) 
                }else{
                    payload = JSON.stringify({ ...payload, ...resident })
                }

				
               let response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'post',
                    body: payload,
                })

                response = await response.json()
                GetChangeUser()
			}

            async function LostAndFound(){
                let idTicket = document.getElementById('idTicket').value
                let cpf1 = document.getElementById('lostAndFoundCpf1').value
                let cpf2 = document.getElementById('lostAndFoundCpf2').value
                let place = document.getElementById('lostAndFoundPlace').value
                let text = document.getElementById('lostAndFoundText').value
                if(idTicket == null ||idTicket == ''){
                    var payload = JSON.stringify({
                        cpf: cpf1,
                        local: place,
                        description: text,
                    })
                }else{
                    idTicket = parseInt(idTicket)
                    var payload = JSON.stringify({
                    cpf: cpf2,
                    id: idTicket,
                    })
                }          
                
               let response = await fetch('http://18.222.162.205:3000/lost-and-found/create', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'post',
                    body: payload,
                })

                response = await response.json()
                if(response.message == 'enum not valid'){
                    alert("Apenas zeladores podem cadastrar itens perdidos.")
                }
                GetLostAndFound()
			}
            
            GetLostAndFound()

            async function GetLostAndFound(){

               let response = await fetch('http://18.222.162.205:3000/lost-and-found/list', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'get',
                })

                response = await response.json()
                document.getElementById('tableLostAndFoundBody').parentNode.removeChild(document.getElementById('tableLostAndFoundBody'));
                newTbody = document.createElement('tbody')
                newTbody.setAttribute('id', 'tableLostAndFoundBody')
                document.getElementById('tableLostAndFound').appendChild(newTbody)
                response.forEach(MountLostAndFoundTable)
			}

            function MountLostAndFoundTable(element, index, array){
                let row = document.createElement("tr")
                
                delete element.id_input_person
                delete element.id_withdrawal_person                

                for(i = 0;i < 4;i++){
                    let data = document.createElement("td")
                    data.innerHTML = Object.values(element)[i]
                    row.appendChild(data)
                }
                document.getElementById('tableLostAndFoundBody').appendChild(row)
            }

            async function PartyRoom(){
                let date = new Date(Date.now()).toISOString()
                date = date.split('T')
                
                start = date[0] + ' ' + document.getElementById('partyRoomStart').value + ':00'
                end = date[0] + ' ' + document.getElementById('partyRoomEnd').value + ':00'
                
                const payload = JSON.stringify({
                    startReservation: start,
                    endReservation: end,
                })

               let response = await fetch('http://18.222.162.205:3000/salon/', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'post',
                    body: payload,
                })

                response = await response.json()
                GetPartyRoom()
            }
            GetPartyRoom()
            async function GetPartyRoom(){

               let response = await fetch('http://18.222.162.205:3000/salon/list', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'get',
                })

                response = await response.json()
                document.getElementById('tablePartyRoomBody').parentNode.removeChild(document.getElementById('tablePartyRoomBody'));
                newTbody = document.createElement('tbody')
                newTbody.setAttribute('id', 'tablePartyRoomBody')
                document.getElementById('tablePartyRoom').appendChild(newTbody)
                response.forEach(MountPartyRoomTable)
            }

            function MountPartyRoomTable(element, index, array){
                let row = document.createElement("tr")   
                element.start_reservation = element.start_reservation.replace('T', ' ')
                element.start_reservation = element.start_reservation.replace('Z', ' ')
                element.start_reservation = element.start_reservation.replace(':00.000', ' ')


                element.end_reservation = element.end_reservation.replace('T', ' ')
                element.end_reservation = element.end_reservation.replace('Z', ' ')  
                element.end_reservation = element.end_reservation.replace(':00.000', ' ')

                tempObject = {id_reserva: element.id,name : element.name, start : element.start_reservation, end : element.end_reservation } 
                for(i = 0;i < 4;i++){
                    let data = document.createElement("td")
                    data.innerHTML = Object.values(tempObject)[i]
                    row.appendChild(data)
                }
                document.getElementById('tablePartyRoomBody').appendChild(row)
            }

            async function RegisterTicket(){
                ticketId = parseInt(document.getElementById('ticketId').value, 10)
                description = document.getElementById('ticketType').value
                const payload = JSON.stringify({
                    idReservation: ticketId,
                    description,
                })

               let response = await fetch('http://18.222.162.205:3000/occurrence/', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'post',
                    body: payload,
                })

                response = await response.json()
                GetRegisterTicket()
            }
            GetRegisterTicket()
             async function GetRegisterTicket(){

               let response = await fetch('http://18.222.162.205:3000/occurrence/list', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <?php echo($_COOKIE['accessToken'])?>'
                    },
                    method: 'get',
                })

                response = await response.json()
                document.getElementById('tableRegisterTicketBody').parentNode.removeChild(document.getElementById('tableRegisterTicketBody'));
                newTbody = document.createElement('tbody')
                newTbody.setAttribute('id', 'tableRegisterTicketBody')
                document.getElementById('tableRegisterTicket').appendChild(newTbody)
                response.forEach(MountRegisterTicketTable)
            }

            function MountRegisterTicketTable(element, index, array){
                let row = document.createElement("tr")   
                delete element.id
                for(i = 0;i < 3;i++){
                    let data = document.createElement("td")
                    data.innerHTML = Object.values(element)[i]
                    row.appendChild(data)
                }
                document.getElementById('tableRegisterTicketBody').appendChild(row)
            }


            function OpenModalChangeUser(){
                document.getElementById('modalChangeUser').removeAttribute('hidden')
                document.getElementById('modalLostAndFound').setAttribute('hidden', '')
                document.getElementById('modalPartyRoom').setAttribute('hidden','')
                document.getElementById('modalRegisterTicket').setAttribute('hidden','')
            }

            function OpenModalLostAndFound(){
                document.getElementById('modalLostAndFound').removeAttribute('hidden')
                document.getElementById('modalChangeUser').setAttribute('hidden','')
                document.getElementById('modalPartyRoom').setAttribute('hidden','')
                document.getElementById('modalRegisterTicket').setAttribute('hidden','')
            }

            function OpenModalPartyRoom(){
                document.getElementById('modalLostAndFound').setAttribute('hidden','')
                document.getElementById('modalChangeUser').setAttribute('hidden','')
                document.getElementById('modalPartyRoom').removeAttribute('hidden')
                document.getElementById('modalRegisterTicket').setAttribute('hidden','')
            }            

            function OpenModalRegisterTicket(){
                document.getElementById('modalLostAndFound').setAttribute('hidden','')
                document.getElementById('modalChangeUser').setAttribute('hidden','')
                document.getElementById('modalPartyRoom').setAttribute('hidden','')
                document.getElementById('modalRegisterTicket').removeAttribute('hidden')
            }      

            function ModalReturn(){
                document.getElementById('greyPanel').setAttribute('hidden','true')
            }

            function OpenModal(modalTitle){
                document.getElementById('greyPanel').removeAttribute('hidden')
                document.getElementById('modalTitle').innerHTML = modalTitle
                if(modalTitle == 'Alteração / Cadastro de Usuário'){
                    OpenModalChangeUser()
                }
                if(modalTitle == 'Achados e Perdidos'){
                    OpenModalLostAndFound()
                }
                if(modalTitle == 'Reservar Salão de Festas'){
                    OpenModalPartyRoom()
                }
                if(modalTitle == 'Registrar Ocorrência'){
                    OpenModalRegisterTicket()
                }
            }
        </script>
	</body>
</html>