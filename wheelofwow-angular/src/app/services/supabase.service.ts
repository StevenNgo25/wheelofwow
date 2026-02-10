import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Auth Methods
  async signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  async getSession(): Promise<Session | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session;
  }

  async getUser(): Promise<User | null> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    return user;
  }

  async isAdmin(): Promise<boolean> {
    const user = await this.getUser();
    if (!user) return false;

    const { data } = await this.supabase.from('profiles').select('role').eq('id', user.id).single();

    return data?.role === 'admin' || data?.role === 'super_admin';
  }

  authChanges(callback: (event: any, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  // Profile Methods
  async getProfile() {
    const user = await this.getUser();
    if (!user) return null;

    return this.supabase.from('profiles').select('*').eq('id', user.id).single();
  }

  async updateProfile(updates: any) {
    const user = await this.getUser();
    if (!user) return null;

    return this.supabase
      .from('profiles')
      .upsert({ ...updates, id: user.id, updated_at: new Date() })
      .select();
  }

  // Lucky Draw Methods
  async createLuckyDraw(drawData: any) {
    const user = await this.getUser();
    if (!user) return null;

    return this.supabase
      .from('lucky_draws')
      .insert([{ ...drawData, user_id: user.id }])
      .select();
  }

  async getLuckyDraws() {
    const user = await this.getUser();
    if (!user) return null;

    return this.supabase
      .from('lucky_draws')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
  }

  async getLuckyDrawById(id: string) {
    return this.supabase.from('lucky_draws').select('*').eq('id', id).single();
  }

  // Admin Methods
  async getProfiles() {
    return this.supabase.from('profiles').select('*').order('created_at', { ascending: false });
  }

  async getSystemSetting(key: string) {
    return this.supabase.from('system_settings').select('value').eq('key', key).single();
  }

  async getStats() {
    const { count: users } = await this.supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { count: draws } = await this.supabase
      .from('lucky_draws')
      .select('*', { count: 'exact', head: true });

    return {
      users: users || 0,
      draws: draws || 0,
    };
  }

  async updateSystemSetting(key: string, value: any) {
    return this.supabase
      .from('system_settings')
      .upsert({ key, value, updated_at: new Date() })
      .select();
  }
}
