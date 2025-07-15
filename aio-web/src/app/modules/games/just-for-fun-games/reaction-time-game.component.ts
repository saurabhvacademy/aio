import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reaction-time-game',
  templateUrl: './reaction-time-game.component.html',
  styleUrls: ['./reaction-time-game.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ReactionTimeGameComponent {
  difficulties = [
    { label: 'Rookie', value: 'rookie', min: 1500, max: 3000, circles: 1 },
    { label: 'Average', value: 'average', min: 1000, max: 2000, circles: 2 },
    { label: 'Pro', value: 'pro', min: 700, max: 1500, circles: 3 },
    { label: 'Legend', value: 'legend', min: 500, max: 1200, circles: 4 },
    { label: 'God', value: 'god', min: 300, max: 900, circles: 5 }
  ];
  selectedDifficulty = this.difficulties[0];
  gameStarted = false;
  waiting = false;
  shapes: any[] = [];
  score: number[] = [];
  message = '';
  timeoutId: any;
  startTime = 0;
  audioStart = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b2e.mp3');
  audioClick = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b4b2e.mp3');
  audioResult = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b4b2e.mp3');
  audioMiss = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115c9b4b2e.mp3');

  selectDifficulty(diff: any) {
    this.selectedDifficulty = diff;
  }

  startGame() {
    this.score = [];
    this.message = '';
    this.gameStarted = true;
    this.waiting = true;
    this.shapes = [];
    this.audioStart.play();
    const delay = this.randomDelay();
    this.timeoutId = setTimeout(() => {
      this.showShapes();
    }, delay);
  }

  randomDelay() {
    const { min, max } = this.selectedDifficulty;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showShapes() {
    this.waiting = false;
    this.shapes = [];
    this.startTime = Date.now();
    const num = this.selectedDifficulty.circles;
    for (let i = 0; i < num; i++) {
      this.shapes.push(this.randomPosition());
    }
  }

  randomPosition() {
    // Container is 400x400px, shape is 80x80px
    const max = 320; // 400 - 80
    return {
      top: Math.floor(Math.random() * max),
      left: Math.floor(Math.random() * max),
      visible: true
    };
  }

  shapeClicked(idx: number) {
    if (!this.shapes[idx].visible) return;
    this.audioClick.currentTime = 0; this.audioClick.play();
    const reaction = Date.now() - this.startTime;
    this.score.push(reaction);
    this.shapes[idx].visible = false;
    // If all shapes are clicked, finish
    if (this.shapes.every(s => !s.visible)) {
      this.audioResult.currentTime = 0; this.audioResult.play();
      this.message = `Reaction: ${reaction} ms! Click Start to play again.`;
      this.gameStarted = false;
    }
  }

  missClick() {
    this.audioMiss.currentTime = 0; this.audioMiss.play();
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
}
