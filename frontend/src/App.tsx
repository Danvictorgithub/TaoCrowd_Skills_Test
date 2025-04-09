import "./App.css";
import React, { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <>
      <main className="container mx-auto min-h-svh">
        <header className="flex items-center flex-col mt-24">
          <img src="/company_icon.png" alt="" />
          <h1 className="text-gray-800 text-xl">Technical Assessment</h1>
        </header>
        <section>
          <div className="mt-12">
            <input
              type="text"
              placeholder="Search..."
              className="border-3 rounded-md p-4 border-gray-600 w-full"
            />
          </div>
          <div className="mt-12 flex flex-col gap-4">
            {/* Card */}
            <div className="p-4 shadow-sm rounded-md">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">DemoStat</h1>
                <p className="p-1 bg-red-500 rounded-md font-medium text-white mb-4">
                  failed
                </p>
              </div>
              <div>
                <Collapsible>
                  <CollapsibleContent>
                    <div className="flex">
                      <p className="text-gray-500">12 years ago</p>
                      <div className="ml-4 flex gap-2">
                        <a href="https://example.com">Article</a>
                        <a href="https://example.com">Video</a>
                      </div>
                    </div>
                    <div className="flex gap-4 my-8">
                      <div className="flex max-w-[100px] max-h-[100px]">
                        <img src="/image.png" alt="sample image" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vero, ducimus facere! Illo odio mollitia dolor,
                        sapiente, nemo optio quos, incidunt doloremque beatae
                        nam iste quis consectetur dolore repudiandae
                        voluptatibus eum.
                      </p>
                    </div>
                  </CollapsibleContent>
                  <CollapsibleTrigger />
                </Collapsible>
              </div>
            </div>
            {isEnd ? (
              <p className="text-center mt-4 font-bold text-gray-600">
                End of list
              </p>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
