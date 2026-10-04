import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from 'next-themes';

import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Monitoring } from './pages/Monitoring';
import { Incidents } from './pages/Incidents';
import { Environmental } from './pages/Environmental';
import { Analytics } from './pages/Analytics';
import { Community } from './pages/Community';
import { Copilot } from './pages/Copilot';
import { Notifications } from './pages/Notifications';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';
import { Security } from './pages/Security';
import { Platform } from './pages/Platform';
import { Solutions } from './pages/Solutions';
import { Impact } from './pages/Impact';
import { Login } from './pages/Login';
import { CitizenHome } from './pages/CitizenHome';
import { CitizenReport } from './pages/CitizenReport';
import { CitizenAssistant } from './pages/CitizenAssistant';
import { CitizenMap } from './pages/CitizenMap';
import { MapView as MunicipalMap } from './pages/Map';
import { PortalRoute } from './components/auth/PortalRoute';
import { getSession } from './lib/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />

      {/* Citizen portal: reporting, map, and the citizen operation agent only. */}
      <Route path="/citizen">
        {() => <PortalRoute roles={["citizen"]}><AppLayout><CitizenHome /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/citizen/report">
        {() => <PortalRoute roles={["citizen"]}><AppLayout><CitizenReport /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/citizen/assistant">
        {() => <PortalRoute roles={["citizen"]}><AppLayout><CitizenAssistant /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/citizen/community">
        {() => <PortalRoute roles={["citizen"]}><AppLayout><Community /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/map">
        {() => <PortalRoute roles={["citizen", "operator", "manager"]}><AppLayout>{getSession()?.role === "citizen" ? <CitizenMap /> : <MunicipalMap />}</AppLayout></PortalRoute>}
      </Route>

      {/* Manager / Operator portal: municipal operations and advanced intelligence. */}
      <Route path="/dashboard">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Dashboard /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/monitoring">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Monitoring /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/incidents">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Incidents /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/environmental">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Environmental /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/analytics">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Analytics /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/community">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Community /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/copilot">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Copilot /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/notifications">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Notifications /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/reports">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Reports /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/profile">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Profile /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/settings">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Settings /></AppLayout></PortalRoute>}
      </Route>
      <Route path="/admin">
        {() => <PortalRoute roles={["operator", "manager"]}><AppLayout><Admin /></AppLayout></PortalRoute>}
      </Route>

      {/* Public / footer pages */}
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/security" component={Security} />
      <Route path="/platform" component={Platform} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/impact" component={Impact} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
