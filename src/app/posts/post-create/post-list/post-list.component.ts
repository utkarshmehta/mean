import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Post } from '../../post.model';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[])=> {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
