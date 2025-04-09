import "./App.css";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Project {
  id: string;
  title: string;
  status: "failed" | "success" | "upcoming";
  description: string;
  image: string;
  video: string;
  article: string;
  createdAt: Date;
  updatedAt: Date;
}
function App() {
  const [data, setData] = useState<Project[]>([]);
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
            {data.map((item) => {
              return (
                <div className="p-4 shadow-sm rounded-md">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">DemoStat</h1>
                    {item.status === "success" ? (
                      <p className="p-1 bg-green-500 rounded-md font-medium text-white mb-4">
                        success
                      </p>
                    ) : item.status === "failed" ? (
                      <p className="p-1 bg-red-500 rounded-md font-medium text-white mb-4">
                        failed
                      </p>
                    ) : item.status === "upcoming" ? (
                      <p className="p-1 bg-cyan-500 rounded-md font-medium text-white mb-4">
                        upcoming
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Collapsible>
                      <CollapsibleContent>
                        <div className="flex">
                          {/* <p className="text-gray-500">12 years ago</p> */}
                          <p className="text-gray-500">
                            {formatDistanceToNow(item.createdAt, {
                              addSuffix: true,
                            })}
                          </p>
                          <div className="ml-4 flex gap-2">
                            <a href={item.article}>Article</a>
                            <a href={item.video}>Video</a>
                          </div>
                        </div>
                        <div className="flex gap-4 my-8">
                          <div className="flex max-w-[100px] max-h-[100px]">
                            <img src={item.image} alt="sample image" />
                          </div>
                          <p>{item.description}</p>
                        </div>
                      </CollapsibleContent>
                      <CollapsibleTrigger />
                    </Collapsible>
                  </div>
                </div>
              );
            })}
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
