import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Campaigns from './pages/Campaigns';
import CampaignNew from './pages/CampaignNew';
import Templates from './pages/Templates';
import TemplateNew from './pages/TemplateNew';
import Flows from './pages/Flows';
import FlowNew from './pages/FlowNew';
import FlowEdit from './pages/FlowEdit';
import TemplateEdit from './pages/TemplateEdit';
import Audiences from './pages/Audiences';
import AudienceNew from './pages/AudienceNew';
import Inbox from './pages/Inbox';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AccountSettings from './pages/AccountSettings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/new" element={<CampaignNew />} />
          <Route path="templates" element={<Templates />} />
          <Route path="templates/new" element={<TemplateNew />} />
          <Route path="templates/:id/edit" element={<TemplateEdit />} />
          <Route path="flows" element={<Flows />} />
          <Route path="flows/new" element={<FlowNew />} />
          <Route path="flows/:id/edit" element={<FlowEdit />} />
          <Route path="audiences" element={<Audiences />} />
          <Route path="audiences/new" element={<AudienceNew />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<AccountSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
