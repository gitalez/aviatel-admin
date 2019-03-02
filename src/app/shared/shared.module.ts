import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { HeaderAdminComponent } from '../shared/header-admin/header-admin.component';
import { SidebarAdminComponent } from '../shared/sidebar-admin/sidebar-admin.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderAdminComponent,
        SidebarAdminComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        FooterAdminComponent,
        ModalUploadComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderAdminComponent,
        SidebarAdminComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        FooterAdminComponent,
        ModalUploadComponent
    ]
})
export class SharedModule { }