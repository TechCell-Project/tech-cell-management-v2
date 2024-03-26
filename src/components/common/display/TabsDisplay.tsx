'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { ReactNode } from 'react';

type Tab = { value: string; name: string; component: ReactNode };

type TabsDisplayProps = {
  tabs: Tab[];
  className?: string;
};

export const TabsDisplay = ({ tabs, className }: TabsDisplayProps) => {
  return (
    <Tabs defaultValue={tabs[0].value} className={className}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
