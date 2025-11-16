package com.pocpossdk;

import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.pocpossdk.shared.utils.logger.AppLogger;

import java.lang.reflect.constructor;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;

public class PocPosSdkPackage extends BaseReactPackage {
  private final String TAG = "PocPosSdkPackage";

  private final String administrator = BuildConfig.ADMINISTRATOR != null
    ? BuildConfig.ADMINISTRATOR
    : "NONE";

  private final Map<String, List<String>> modulesMap = Map.of(
    "REDE", List.of(
      "rede.presentation.RedeTefModule",
      "rede.presentation.RedePrinterModule",
      "rede.presentation.RedeScannerModule"
    )
  );

  public PocPosSdkPackage() {
    AppLogger.debug(TAG, "PocPosSdkPackage initialized with administrator = " + administrator);
  }


  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    List<String> modules = modulesMap.get(administrator);
    if (modules == null) {
      AppLogger.debug(TAG, "No modules found for administrator = " + administrator);
      return null;
    }

    String className = null;
    for (String module : modules) {
      if (module.endsWith(name)) {
        className = module;
        break;
      }
    }

    if (className == null) {
      AppLogger.debug(TAG, "Module name '" + name + "' not mapped for administrator = " + administrator);
      return null;
    }

    try {
      String fullClassName = "com.pocpossdk.infrastructure.integrations." + className;
      Class<?> moduleClass = Class.forName(fullClassName);
      Constructor<?> constructor = moduleClass.getDeclaredConstructor(ReactApplicationContext.class);
      return (NativeModule) constructor.newInstance(reactContext);
    } catch (Exception e) {
      AppLogger.debug(TAG, "Error loading module " + name + ": " + e.getMessage());
      return null;
    }
  }


  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
      List<String> modules = modulesMap.get(administrator);

      if (modules == null) return moduleInfos;

      for (String fqcn : modules) {
        String moduleName = fqcn.substring(fqcn.lastIndexOf('.') + 1);
        moduleInfos.put(
          moduleName,
          new ReactModuleInfo(
            moduleName,
            moduleName,
            false, // canOverrideExistingModule
            false, // needsEagerInit
            false, // isCxxModule
            false  // isTurboModule
          )
        );
      }

      return moduleInfos;
    };
  }
}
