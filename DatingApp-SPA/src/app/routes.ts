import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolvers } from './_resolvers/member-detail-resolvers';
import { MemberListResolvers } from './_resolvers/member-list-resolvers';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolvers } from './_resolvers/member-edit-resolvers.';
import { PrevetUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export const appRoutes:  Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolvers}},
            { path: 'members/:id', component: MemberDetailComponent,
                resolve: {user: MemberDetailResolvers}},
            { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolvers}, canDeactivate: [PrevetUnsavedChanges]},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
