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

  private profileCache: any = null;

  authChanges(callback: (event: any, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  // Profile Methods
  async getProfile() {
    if (this.profileCache) return { data: this.profileCache, error: null };

    const user = await this.getUser();
    if (!user) return null;

    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (data) this.profileCache = data;

    return { data, error };
  }

  async updateProfile(updates: any) {
    const user = await this.getUser();
    if (!user) return null;

    const { data, error } = await this.supabase
      .from('profiles')
      .upsert({ ...updates, id: user.id, updated_at: new Date() })
      .select()
      .single();

    if (data) this.profileCache = data;

    return { data, error };
  }

  async isAdmin(): Promise<boolean> {
    const { data } = (await this.getProfile()) || {};
    return data?.role === 'admin' || data?.role === 'super_admin';
  }

  async signOut() {
    this.profileCache = null;
    return this.supabase.auth.signOut();
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
  async getProfiles(
    page: number = 1,
    perPage: number = 20,
    search: string = '',
    sortBy: string = 'created_at',
    sortOrder: 'asc' | 'desc' = 'desc',
  ) {
    let query = this.supabase.from('profiles').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
    }

    if (sortBy) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    }

    const start = (page - 1) * perPage;
    const end = start + perPage - 1;

    const { data, count, error } = await query.range(start, end);

    return { data, count, error };
  }

  async updateUser(userId: string, updates: any) {
    return this.supabase.from('profiles').update(updates).eq('id', userId).select().single();
  }

  async toggleUserLock(userId: string, isLocked: boolean) {
    // Assuming there is a 'locked' column or 'status' column in profiles.
    // If not, we might need to add it to the schema, but for now let's assume 'is_locked'.
    // If the schema uses a different field (e.g. banning via auth.users), it requires service_role key which we might not have here directly exposed safely.
    // We will stick to updating the profile table for application-level locking.
    return this.updateUser(userId, { is_locked: isLocked });
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

  async getSubscriptionTier(): Promise<string> {
    const profile = await this.getProfile();
    return profile?.data?.subscription_tier || 'free';
  }
}
