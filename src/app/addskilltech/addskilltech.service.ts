import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddskilltechService {
  constructor(private AF: AngularFirestore) {}

  async addskill(skill: string) {
    const doc = await this.AF.collection('techskills').snapshotChanges().subscribe(doc => {
      console.log('doc is', doc[0]);
      let id = doc[0].payload.doc.id;
       this.AF.collection('techskills').valueChanges().subscribe(doc => {
      console.log('doc new', doc);
        const newtechnologies = new Set(doc[0]['technologies']);
        newtechnologies.add(skill);
        let technologies = { 'technologies' : Array.from(newtechnologies)};
        return this.AF.collection('techskills').doc(id).update(technologies);
      })
    })
    // const doc = this.AF.doc<any>('techskills/1')
  }
}
