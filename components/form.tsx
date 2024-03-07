"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "@/utils/firebase-config";
import Image from "next/image";
import {
  addMenuCategory,
  addFolderCategory,
  getAllFolderCategoryData,
  getFolderCategoryData,
  getMenuCategoryData,
  updateFolderCategory,
  updateMenuCategory,
} from "@/services/firestore-services";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  description: string;
  imageUrl: string;
  folderId: string;
  items: number;
};

const Form = ({
  isFolder,
  isEdit,
  id,
}: {
  isFolder: boolean;
  isEdit?: boolean;
  id?: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [foldersData, setFoldersData] = useState<any[]>([]);
  const [isFolderFetched, setIsFolderFetched] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState("");
  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    imageUrl: "",
    folderId: "",
    items: 0,
  });
  const [error, setError] = useState("");
  const [folderError, setFolderError] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name must be at most 50 characters"),
  });

  const resetState = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      folderId: "",
      items: 0,
    });
    setCurrentFolderId("");
    setImage(null);
    setError("");
    formik.resetForm();
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (image !== null) {
      const imageRef = ref(storage, `images/${v4()}`);
      const uploadImage: UploadResult = await uploadBytes(imageRef, image);
      if (uploadImage.ref) {
        const imageUrl: string = await getDownloadURL(uploadImage.ref);
        if (imageUrl) {
          setFormData((prevState) => ({ ...prevState, imageUrl: imageUrl }));
          if (isFolder) {
            if (isEdit && id) {
              // This update function return void
              updateFolderCategory(id, {
                name: formik.values.name,
                imageUrl: imageUrl,
              })
                .then((_value) => resetState())
                .catch((error) => {
                  setError("Something went wrong category not created");
                  console.error("Category Error: ", error);
                  toast.error("Something went wrong");
                })
                .finally(() => {
                  toast.success(
                    `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                    {
                      duration: 5000,
                      position: "bottom-center",
                    }
                  );
                  setLoading(false);
                  router.push("/");
                });
            } else {
              const isFolderCreated = await addFolderCategory({
                name: formik.values.name,
                imageUrl: imageUrl,
              });
              if (isFolderCreated?.id) {
                resetState();
                toast.success(
                  `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                  {
                    duration: 5000,
                    position: "bottom-center",
                  }
                );
                setLoading(false);
                router.push("/");
              } else {
                setError("Something went wrong category not created");
                console.error("Category Error: ", error);
                toast.error("Something went wrong");
              }
            }
          } else {
            if (isEdit && id) {
              // this function return void
              updateMenuCategory(id, {
                name: formik.values.name,
                description: formData.description,
                folderId: currentFolderId,
                imageUrl: imageUrl,
                items: formData.items,
                folderName: foldersData.find((f) => f?.id === currentFolderId)
                  ?.name,
              })
                .then((_value) => resetState())
                .catch((error) => {
                  setError("Something went wrong category not created");
                  console.error("Category Error: ", error);
                  toast.error("Something went wrong");
                })
                .finally(() => {
                  toast.success(
                    `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                    {
                      duration: 5000,
                      position: "bottom-center",
                    }
                  );
                  setLoading(false);
                  router.push("/");
                });
            } else {
              const isMenuCreated = await addMenuCategory({
                name: formik.values.name,
                description: formData.description,
                folderId: currentFolderId,
                imageUrl: imageUrl,
                items: formData.items,
                folderName: foldersData.find((f) => f?.id === currentFolderId)
                  ?.name,
              });

              if (isMenuCreated?.id) {
                resetState();
                toast.success(
                  `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                  {
                    duration: 5000,
                    position: "bottom-center",
                  }
                );
                setLoading(false);
                router.push("/");
              } else {
                setError("Something went wrong category not created");
                console.error("Category Error: ", error);
                toast.error("Something went wrong");
              }
            }
          }
        }
      } else {
        setError("Image upload error");
        console.error("Storage image upload errror ");
        setLoading(false);
        toast.error("Image upload error");
      }
    } else {
      if (isFolder) {
        if (isEdit && id) {
          // this functions return void
          updateFolderCategory(id, {
            name: formik.values.name,
          })
            .then((_value) => resetState())
            .catch((error) => {
              setError("Something went wrong category not created");
              console.error("Category Error: ", error);
              toast.error("Something went wrong");
            })
            .finally(() => {
              toast.success(
                `Folder Category ${isEdit ? "Updated" : "Created"}.`,
                {
                  duration: 5000,
                  position: "bottom-center",
                }
              );
              setLoading(false);
              router.push("/");
            });
        } else {
          const isFolderCreated = await addFolderCategory({
            name: formik.values.name,
          });

          if (isFolderCreated?.id) {
            resetState();
            toast.success(
              `Folder Category ${isEdit ? "Updated" : "Created"}.`,
              {
                duration: 5000,
                position: "bottom-center",
              }
            );
            setLoading(false);
            router.push("/");
          } else {
            setError("Something went wrong category not created");
            console.error("Category Error");
            toast.error("Something went wrong");
          }
        }
      } else {
        if (isEdit && id) {
          // this function return void
          updateMenuCategory(id, {
            name: formik.values.name,
            description: formData.description,
            folderId: currentFolderId,
            items: formData.items,
            folderName: foldersData.find((f) => f?.id === currentFolderId)
              ?.name,
          })
            .then((_value) => resetState())
            .catch((error) => {
              setError("Something went wrong category not created");
              console.error("Category Error: ", error);
              toast.error("Something went wrong");
            })
            .finally(() => {
              toast.success(
                `Menu Category ${isEdit ? "Updated" : "Created"}.`,
                {
                  duration: 5000,
                  position: "bottom-center",
                }
              );

              setLoading(false);
              router.push("/");
            });
        } else {
          const isMenuCreated = await addMenuCategory({
            name: formik.values.name,
            description: formData.description,
            folderId: currentFolderId,
            items: formData.items,
            folderName: foldersData.find((f) => f?.id === currentFolderId)
              ?.name,
          });

          if (isMenuCreated?.id) {
            resetState();
            toast.success(`Menu Category ${isEdit ? "Updated" : "Created"}.`, {
              duration: 5000,
              position: "bottom-center",
            });
            setLoading(false);
            router.push("/");
          } else {
            setError("Something went wrong category not created");
            console.error("Category Error: ", error);
            toast.error("Something went wrong");
          }
        }
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "image") {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        setImage(inputElement.files[0]);
      } else {
        setImage(null); // or handle the case where files are not present
      }
    } else if (e.target.name === "name" && e.target.value?.length === 51) {
      // do nothing
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setImage(files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (isEdit && id !== undefined && id !== "") {
      if (isFolder) {
        const getCurrentFolderData = async () => {
          const data = await getFolderCategoryData(id);
          if (data !== null && Object.keys(data)?.length > 0) {
            setFormData((prevState) => ({
              ...prevState,
              name: data?.name,
              imageUrl: data?.imageUrl,
            }));
            formik.setValues({ name: data?.name });
          }
        };

        getCurrentFolderData();
      } else {
        const getCurrentMenuData = async () => {
          const data = await getMenuCategoryData(id);

          if (
            data !== null &&
            data !== undefined &&
            Object.keys(data)?.length > 0
          ) {
            setFormData((prevState) => ({
              ...prevState,
              name: data?.name,
              imageUrl: data?.imageUrl,
              items: data?.items,
              description: data?.description,
            }));
            setCurrentFolderId(data?.folderId || "");
            formik.setValues({ name: data?.name });
          }
        };

        getCurrentMenuData();
      }
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (!isFolder) {
      setLoading(true);

      const getFolderCategories = async () => {
        const data = await getAllFolderCategoryData();
        if (data?.length > 0) {
          setFoldersData(data);
          setIsFolderFetched(true);
        }
        setLoading(false);
      };

      getFolderCategories();
    }
  }, []);

  useEffect(() => {
    if (!isFolder && foldersData?.length === 0 && isFolderFetched) {
      setFolderError("No Folder available please create folder category.");
    } else {
      setFolderError("");
    }
  }, [foldersData]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* image input div */}
      <div
        className={"flex flex-col gap-2" + (isFolder ? " order-2" : " order-1")}
      >
        <div className="text-lg text-primary-text">Image (Optional)</div>
        <label
          className="
                    flex
                    flex-col
                    gap-8
                    justify-center
                    items-center
                    min-h-72
                    border-4
                    border-primary-text
                    skew-y-[-1deg]
                    skew-x-[-1deg]
                    uneven
                    text-center
                "
        >
          <input
            type="file"
            name="image"
            className="hidden"
            onChange={handleChange}
          />
          <Image width={89} height={83} src="/upload.png" alt="upload" />
          <div className="text-lg text-primary-text">
            {image !== null ? image?.name : "Click here to upload an image"}
          </div>
        </label>
      </div>
      {/* name input div */}
      <div
        className={"flex flex-col gap-2" + (isFolder ? " order-1" : " order-2")}
      >
        <div className="text-lg text-primary-text">Name</div>
        <div
          className="
                    relative
                    w-full
                    border-2
                    border-primary-text
                    skew-x-6
                    uneven
                    px-2
                    py-1
                "
        >
          <input
            type="text"
            name="name"
            className="
                        bg-transparent
                        w-full
                        focus-visible:outline-none
                        z-10
                    "
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="self-end text-secondary-text text-sm">{`${formik.values.name?.length}/50`}</div>
        {formik.errors.name && formik.touched.name ? (
          <div className="text-lg text-rose-500">{formik.errors.name}</div>
        ) : null}
      </div>
      {/* description input div */}
      {!isFolder ? (
        <div className="flex flex-col gap-2 order-3">
          <div className="text-lg text-primary-text">
            Description (Optional)
          </div>
          <div
            className="
                    relative
                    w-full
                    border-2
                    border-primary-text
                    skew-x-6
                    uneven
                    px-2
                    py-1
                "
          >
            <textarea
              className="
                        bg-transparent
                        w-full
                        focus-visible:outline-none
                        z-10
                    "
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
            ></textarea>
          </div>
        </div>
      ) : null}
      {/* Folder input div */}
      {!isFolder ? (
        <div
          className={
            "flex flex-col gap-2" + (isFolder ? " order-1" : " order-2")
          }
        >
          <div className="text-lg text-primary-text">Folder</div>
          <div
            className="
                    relative
                    w-full
                    border-2
                    border-primary-text
                    skew-x-6
                    uneven
                    px-2
                    py-1
                "
          >
            <select
              name="folder"
              required
              className="
                        bg-transparent
                        w-full
                        focus-visible:outline-none
                        z-10
                    "
              value={currentFolderId}
              onChange={(e) => setCurrentFolderId(e.target.value)}
            >
              <option value={""} disabled>
                Select
              </option>
              {foldersData?.length > 0 ? (
                foldersData?.map((data) => (
                  <option key={data?.id} value={data?.id}>
                    {data?.name}
                  </option>
                ))
              ) : (
                <option value={""} disabled>
                  No Folders
                </option>
              )}
            </select>
          </div>
        </div>
      ) : null}
      {/* items input div */}
      {!isFolder ? (
        <div
          className={
            "flex flex-col gap-2" + (isFolder ? " order-1" : " order-2")
          }
        >
          <div className="text-lg text-primary-text">Items (Optional)</div>
          <div
            className="
                    relative
                    w-full
                    border-2
                    border-primary-text
                    skew-x-6
                    uneven
                    px-2
                    py-1
                "
          >
            <input
              type="number"
              name="items"
              required
              className="
                        bg-transparent
                        w-full
                        focus-visible:outline-none
                        z-10
                    "
              value={formData.items}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : null}
      {/* Errors */}
      {error ? <div className="text-md text-rose-500">{error}</div> : null}
      {folderError ? (
        <div className="text-md text-rose-500">{folderError}</div>
      ) : null}
      {/* action div */}
      <div
        className="
                relative
                bottom-0
                flex
                gap-6
                justify-between
                px-6
                py-4
                mt-auto
                order-4
            "
      >
        <Button disabled={loading} variant="secondary" navigateLink="/">
          Cancel
        </Button>
        <Button
          disabled={loading || error !== "" || folderError !== ""}
          variant="primary"
          type="submit"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
