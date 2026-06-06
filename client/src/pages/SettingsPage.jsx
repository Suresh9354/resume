import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Switch from '@radix-ui/react-switch';
import { Moon, Sun, Bell, Lock, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

function SettingRow({ icon: Icon, title, desc, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#27272A] last:border-0">
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-[#8B5CF6] mt-0.5" />
        <div>
          <p className="font-medium text-[#F8FAFC] text-sm">{title}</p>
          {desc && <p className="text-xs text-[#9CA3AF] mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const Toggle = ({ checked, onCheckedChange }) => (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        'w-11 h-6 rounded-full relative transition-colors',
        checked ? 'bg-[#8B5CF6]' : 'bg-[#27272A]'
      )}
    >
      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
    </Switch.Root>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">Settings</h1>
        <p className="text-[#9CA3AF] mt-1">Customize your experience</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Theme preferences (UI preview)</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingRow icon={darkMode ? Moon : Sun} title="Dark mode" desc="Premium dark theme enabled">
            <Toggle checked={darkMode} onCheckedChange={setDarkMode} />
          </SettingRow>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow icon={Bell} title="Email notifications" desc="Analysis complete alerts">
            <Toggle checked={emailNotif} onCheckedChange={setEmailNotif} />
          </SettingRow>
          <SettingRow icon={Bell} title="Push notifications" desc="Browser push alerts">
            <Toggle checked={pushNotif} onCheckedChange={setPushNotif} />
          </SettingRow>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingRow icon={Lock} title="Change password" desc="Update your account password">
            <Button variant="secondary" size="sm">Update</Button>
          </SettingRow>
          <div className="pt-2">
            <label className="text-sm text-[#9CA3AF] mb-2 block">Current password</label>
            <Input type="password" placeholder="••••••••" className="mb-3" />
            <label className="text-sm text-[#9CA3AF] mb-2 block">New password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow icon={Trash2} title="Delete account" desc="Permanently remove your data">
            <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>Delete</Button>
          </SettingRow>
          {showDelete && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-400 mb-3">This action cannot be undone. All resume data will be deleted.</p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm">Confirm Delete</Button>
                <Button variant="ghost" size="sm" onClick={() => setShowDelete(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
