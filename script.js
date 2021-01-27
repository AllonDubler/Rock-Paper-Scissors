const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

const results = document.getElementById('results');
const roundTitle = document.getElementById('roundTitle');

let playerSelection = '';
let roundNum = 1;
let wins = 0;
let losses = 0;
let draws = 0;

roundTitle.textContent = `Round ${roundNum}${roundNum > 5 ? ' (OT)' : ''}`;

function playRound(playerSelection) {
    
    function computerPlay() {
        const plays = ['Rock', 'Paper', 'Scissors'];
        let randomPlay = Math.floor(Math.random() * plays.length);
        return plays[randomPlay];
    }
    
    computerSelection = computerPlay();
    
    function rockPaperScissors(playerSelection, computerSelection) {
                
        if (playerSelection == computerSelection) {
            draws++;
            return `${playerSelection} against ${computerSelection} – it's a draw`
        }
        else if(playerSelection == 'Rock' && computerSelection == 'Paper' 
        || playerSelection == 'Paper' && computerSelection == 'Scissors'
        || playerSelection == 'Scissors' && computerSelection == 'Rock') {
            losses++;
            return `You Lose – ${computerSelection} beats ${playerSelection}`;
        } else {
            wins++;
            return `You Win – ${playerSelection} beats ${computerSelection}`;
        }
    } 
    
    let roundResult = `Round ${roundNum}: ${rockPaperScissors(
        playerSelection, computerSelection)}`;
    
    printResult(roundResult)
};           

function playGame(playerSelection) {
    
    playRound(playerSelection);    
    if (roundNum<5 || losses==wins) {
        roundNum++;
        roundTitle.textContent = `${roundNum>5 ? 'Sudden death overtime – ': ''}Round ${roundNum}`;
    }

    if(wins > ((5 - draws)/2) && roundNum <= 5  || (roundNum>5 && losses < wins)) {
        let winMessage = `You win – ${wins} ${wins==1 ? 'win' : 'wins'}, ${losses} ${losses==1 ? 
            'loss' : 'losses'}${draws==0 ? '' : `, ${draws}`} ${draws==0 ? '' : draws==1 ? 'draw' : 
            'draws'}`;
        roundTitle.textContent = winMessage;
        toggle('gameplayButtons');
        insertPlayAgainButton();
    }
    
    else if(losses > ((5 - draws)/2) && roundNum <= 5 || (roundNum>5 && losses > wins)) {
        let lossMessage = `You lose – ${wins} ${wins==1 ? 'win' : 'wins'}, ${losses} ${losses==1 ? 
            'loss' : 'losses'}${draws==0 ? '' : `, ${draws}`} ${draws==0 ? '' : draws==1 ? 'draw' : 
            'draws'}`;
        roundTitle.textContent = lossMessage;
        toggle('gameplayButtons');
        insertPlayAgainButton();
    }
    
    else if(roundNum==6 && wins==losses) {
        let drawMessage = `It's a draw – ${wins} ${wins==1 ? 'win' : 'wins'}, ${losses} ${losses==1 ? 
            'loss' : 'losses'}, ${draws==0 ? '' : draws} ${draws==0 ? '' : draws==1 ? 'draw' : 
            'draws'}. Begin sudden death overtime.`;
        roundTitle.textContent = drawMessage;
    }
    
}

function toggle(ID) {
    let element = document.getElementById(ID);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none'
    }
}

function printResult(text) {
    let p = document.createElement('p');
    let resultText = document.createTextNode(text);
    p.appendChild(resultText);
    results.insertBefore(p,results.firstChild);
}

function insertPlayAgainButton() {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Play Again";
    btn.classList = "btn btn-outline-dark";
    btn.id = "playAgainButton";
    btn.addEventListener ('click', function() {
        playAgain();
    });
    const playAgainDiv = document.getElementById('playAgainDiv')
    playAgainDiv.appendChild(btn);
}

function playAgain() {
    roundNum = 1;
    wins = 0;
    losses = 0;
    draws = 0;
    results.textContent = '';
    roundTitle.textContent = 'Round 1';
    document.getElementById('playAgainButton').remove();
    toggle('gameplayButtons');
}

rock.addEventListener('click', function() {
    playerSelection = 'Rock';
    playGame(playerSelection);
});

paper.addEventListener('click', function() {
    playerSelection = 'Paper';
    playGame(playerSelection);
});

scissors.addEventListener('click', function() {
    playerSelection = 'Scissors';
    playGame(playerSelection);
});