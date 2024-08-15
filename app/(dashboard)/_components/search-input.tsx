"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useDebounceValue } from "usehooks-ts"; // Correct import
import {
    ChangeEvent,
    useEffect,
    useState,
} from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");

    // Use tuple destructuring to extract debouncedValue
    const [debouncedValue, _] = useDebounceValue<string>(value, 500, {
        // Optional: specify options here, if needed
    });
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        if (debouncedValue) { // Only update the URL if debouncedValue is not empty
            const url = qs.stringifyUrl({
                url: "/",
                query: {
                    search: debouncedValue,
                },
            }, { skipEmptyString: true, skipNull: true });

            router.push(url);
        }
    }, [debouncedValue, router]);

    return (
        <div className="w-full relative">
            <Search 
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
            <Input 
                className="w-full max-w-[516px] pl-9"
                placeholder="Search boards"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};
